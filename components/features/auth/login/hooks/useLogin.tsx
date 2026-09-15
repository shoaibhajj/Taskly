"use client";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/login.service";
import { LogInFormData } from "../schemas/login";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";

export function useLogin() {
  const router = useRouter();

  const login = async (data: LogInFormData, remember_me: boolean) => {
    try {
      const response = await loginUser(data, remember_me);

      if (response.user) {
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
