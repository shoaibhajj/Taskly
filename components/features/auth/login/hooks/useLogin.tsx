"use client";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/login.service";
import { LogInFormData } from "../schemas/login";
import { getAccessToken, storeSession } from "@/lib/auth/session";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";

export function useLogin() {
  const router = useRouter();

  const login = async (data: LogInFormData, checkedRememberMe: boolean) => {
    try {
      const { access_token, refresh_token } = await loginUser(data);

      storeSession({ access_token, refresh_token }, checkedRememberMe);

      if (getAccessToken()) {
        router.push("/projects");
      }
    } catch (error) {
      toast.error(
        error instanceof ApiError && error.status === 400
          ? `Invalid email or password.`
          : "Something went wrong. Please try again.",
      );
    }
  };

  return { login };
}
