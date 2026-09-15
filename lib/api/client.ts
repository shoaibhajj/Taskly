import {
  clearSession,
  getAccessToken,
  getCookie,
  getRefreshToken,
  storeSession,
} from "@/lib/auth/session";
import { redirect } from "next/navigation";

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
if (typeof window !== "undefined") {
  const token = getAccessToken(); 
  if (token) headers.set("Authorization", `Bearer ${token}`);
} else {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (token) headers.set("Authorization", `Bearer ${token}`);
}

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
      clearSession();

      if (typeof window !== "undefined") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      } else {
        redirect("/login");
      }
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
    const url = `${BASE_URL}/auth/v1/token?grant_type=refresh_token`;

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
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(expires_at * 1000),
    });

    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: refreshExp,
    });
    cookieStore.set("remember_me", String(remember_me), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: refreshExp,
    });

    return true;
  } catch {
    return false;
  }
}
