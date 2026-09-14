"use client";
import {  useRouter } from "next/navigation";
import { SignUpFormData } from "../schemas/signup";
import SignUpUser from "../services/signup.service";
import { toast } from "sonner";

export function useSignUp() {
  const router = useRouter();
  const signUp = async (data: SignUpFormData) => {
    try {
      const response = await SignUpUser(data);

    if (response.access_token) router.push("/login");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return { signUp };
}
