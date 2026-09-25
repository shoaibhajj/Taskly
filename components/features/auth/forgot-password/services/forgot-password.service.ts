import { ApiError } from "@/lib/api/client";
import { forgotPasswordFormData } from "../schemas/forgot-password";
import { forgotPasswordApiResponse } from "../types";
import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

export async function forgotPassword(
  email: forgotPasswordFormData,
): Promise<forgotPasswordApiResponse> {
  const res = await fetch(LOCAL_ENDPOINTS.FORGOT_PASSWORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
  const data = (await res.json()) as forgotPasswordApiResponse;
  return data;
}
