import { ApiError } from "@/lib/api/client";
import { SignUpFormData } from "../schemas/signup";
import { SignUpApiResponse } from "../types";
import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

export default async function SignUpUser(
  dataForm: SignUpFormData,
): Promise<SignUpApiResponse> {
  const { email, password, name, job_title } = dataForm;
  const res = await fetch(LOCAL_ENDPOINTS.SIGNUP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      data: {
        name,
        job_title: job_title || undefined,
      },
    }),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
  const data = await res.json();
  return data;
}
