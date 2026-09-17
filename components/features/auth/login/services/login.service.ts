import { ApiError } from "@/lib/api/client";
import { LogInFormData } from "../schemas/login";
import { LoginApiResponse } from "../types";
import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

export async function loginUser(
  credentials: LogInFormData,
  remember_me: boolean,
): Promise<LoginApiResponse> {
  const res = await fetch(LOCAL_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...credentials, remember_me }),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
  const data = (await res.json()) as LoginApiResponse;
  return data;
}
