"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/lib/api/client";
import { resetPassword as resetPasswordService } from "../services/reset-password.service";
import { resetPasswordFormData } from "../schemas/reset-password";

type ResetLinkStatus = "checking" | "valid" | "invalid";

export function useResetPassword() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [linkStatus, setLinkStatus] = useState<ResetLinkStatus>("checking");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<ApiError>();

  const hasReadLink = useRef(false);

  useEffect(() => {
    if (hasReadLink.current) return;
    hasReadLink.current = true;

    const readTokenAndReplaceURL = () => {
      // console.log(new URLSearchParams(window.location.hash));

      const params = new URLSearchParams(window.location.hash.slice(1));
      const token = params.get("access_token");
      const type = params.get("type");

      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );

      if (!token || type !== "recovery") {
        setLinkStatus("invalid");
        return;
      }

      setAccessToken(token);
      setLinkStatus("valid");
    };
    readTokenAndReplaceURL();
  }, []);

  const reset = async (data: resetPasswordFormData) => {
    if (!accessToken || linkStatus !== "valid" || isLoading) return;

    try {
      setIsLoading(true);
      setError(undefined);

      await resetPasswordService({
        accessToken,
        password: data.password,
      });

      setAccessToken(null);
      setIsSuccess(true);
    } catch (err) {
      const apiError =
        err instanceof ApiError
          ? err
          : new ApiError("Something went wrong. Please try again.", 500);

      setError(apiError);
      toast.error(apiError.message);

      if (apiError.status === 401 || apiError.status === 403) {
        setAccessToken(null);
        setLinkStatus("invalid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reset,
    linkStatus,
    isLoading,
    isSuccess,
    error,
  };
}
