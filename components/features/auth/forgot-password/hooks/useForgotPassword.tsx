"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";
import { forgotPassword } from "../services/forgot-password.service";
import { forgotPasswordFormData } from "../schemas/forgot-password";

const RESEND_COOLDOWN_SECONDS = 5 * 60; 
const MAX_SEND_ATTEMPTS = 4; 

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<ApiError>();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(MAX_SEND_ATTEMPTS);

  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const forgot = async (data: forgotPasswordFormData) => {
    if (isLoading) return;
    if (remainingSeconds > 0) return;
    if (resendAttempts <= 0) return;

    try {
      setIsLoading(true);
      setError(undefined);
      await forgotPassword(data);
      setResendAttempts((prev) => prev - 1);
      setRemainingSeconds(RESEND_COOLDOWN_SECONDS);
      setIsSuccess(true);
    } catch (err) {
      const apiError =
        err instanceof ApiError
          ? err
          : new ApiError("Something went wrong. Please try again.", 500);
      setError(apiError);
      toast.error(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    forgot,
    error,
    isLoading,
    remainingSeconds,
    isSuccess,
    resendAttempts,
  };
}
