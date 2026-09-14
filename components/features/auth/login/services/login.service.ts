import { api } from "@/lib/api/client";
import { LogInFormData } from "../schemas/login";
import { SignInResponse } from "../types";
import { ENDPOINTS } from "@/constants/endpoints";

export async function loginUser(
  credentials: LogInFormData,
): Promise<SignInResponse> {
  return api.post<SignInResponse>(ENDPOINTS.LOGIN, credentials);
}
