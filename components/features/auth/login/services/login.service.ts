import { ApiError } from "@/lib/api/client";
import { LogInFormData } from "../schemas/login";
import { SignInResponse } from "../types";

export async function loginUser(
  credentials: LogInFormData,
  remember_me: boolean,
): Promise<Partial<SignInResponse>> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...credentials, remember_me }),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
  const data = (await res.json()) as SignInResponse;
  return data;
}
