import { api } from "@/lib/api/client";
import { SignUpFormData } from "../schemas/signup";
import { SignUpResponse } from "../types";
import { ENDPOINTS } from "@/constants/endpoints";

export default function SignUpUser(
  data: SignUpFormData,
): Promise<SignUpResponse> {
      const { email, password, name, jobTitle } = data;
  return api.post(ENDPOINTS.SIGN_UP, {
        email,
        password,
        data: {
          name,
          job_title: jobTitle || undefined,
        }});
}
