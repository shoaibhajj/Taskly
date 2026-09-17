import { redirect } from "next/navigation";
import { deleteAuthCookies, setCookies } from "../auth/cookies";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(
  endpoint: string,
  options: Omit<RequestInit, "body"> & { body?: unknown } = {},
  isRetry = false,
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("apikey", API_KEY!);

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: body as BodyInit,
  });

  if (response.status === 401 && !isRetry) {
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      return apiFetch<T>(endpoint, options, true);
    } else {
      // clearSession();
      await deleteAuthCookies();

      redirect("/login");
    }
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new ApiError(data.msg || "API request failed", response.status);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestInit, "body">,
  ) => apiFetch<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestInit, "body">,
  ) => apiFetch<T>(endpoint, { ...options, method: "PUT", body }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};

async function tryRefreshToken(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const remember_me = cookieStore.get("remember_me")?.value;
  if (!refreshToken) return false;

  try {
    const url = `${BASE_URL}${SUPABASE_ENDPOINTS.REFRESH_TOKEN}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY!,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!response.ok) return false;

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    const { access_token, refresh_token, expires_at } = data;

    const date = new Date();
    date.setTime(
      date.getTime() + (remember_me === "true" ? 30 : 1) * 24 * 60 * 60 * 1000,
    );
    const refreshExp = date;

    if (!access_token || !refresh_token) return false;

    await setCookies("access_token", access_token, new Date(expires_at * 1000));
    await setCookies("refresh_token", refresh_token, refreshExp);
    await setCookies("remember_me", String(remember_me), refreshExp);

    return true;
  } catch {
    return false;
  }
}
