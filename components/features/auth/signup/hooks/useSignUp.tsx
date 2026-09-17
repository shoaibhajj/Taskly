"use client";
import { useRouter } from "next/navigation";
import { SignUpFormData } from "../schemas/signup";
import SignUpUser from "../services/signup.service";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";

export function useSignUp() {
  const router = useRouter();
  const signUp = async (data: SignUpFormData) => {
    try {
      await SignUpUser(data);

      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? `${error.message}`
          : "Something went wrong. Please try again.",
      );
    }
  };

  return { signUp };
}
