"use client";
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  forgotPasswordFormData,
  forgotPasswordSchema,
} from "../schemas/forgot-password";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { FormField } from "@/components/ui/FromField";

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] =
    useState<forgotPasswordFormData | null>(null);

  const {
    forgot,
    isLoading,
    isSuccess,
    error,
    remainingSeconds,
    resendAttempts,
  } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: forgotPasswordFormData) => {
    setSubmittedEmail(data);
    await forgot(data);
  };

  const handleResend = () => {
    if (!submittedEmail) return;
    forgot(submittedEmail);
  };

  const canResend = !isLoading && remainingSeconds <= 0 && resendAttempts > 0;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-slate-dark text-xl font-bold">
            Forgot password?
          </h1>
          <p className="text-slate-mid mt-1 text-sm">
            No worries, we&apos;ll send you reset instructions.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
          >
            <div>
              <FormField<forgotPasswordFormData>
                id="email"
                type="email"
                register={register}
                disabled={isLoading || isSuccess}
                errors={errors}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-500">
                {error.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              aria-busy={isLoading}
              className="w-full rounded-lg py-3 text-sm font-semibold"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <Link
            href="/login"
            className="text-primary mt-5 flex items-center justify-center gap-1.5 text-sm font-medium"
          >
            <span aria-hidden="true">←</span> Back to log in
          </Link>
        </div>

        {isSuccess && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
            <div className="flex items-start gap-2.5 p-4">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-sm text-emerald-900">
                If an account exists with this email, we&apos;ve sent a password
                reset link.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-emerald-200/70 px-4 py-2.5">
              <span className="text-xs font-semibold tracking-wide text-emerald-700/70 uppercase">
                Didn&apos;t receive email?
              </span>

              {resendAttempts <= 0 ? (
                <span className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                  No attempts left
                </span>
              ) : canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary text-xs font-bold tracking-wide uppercase"
                >
                  Resend
                </button>
              ) : (
                <span className="text-primary text-xs font-bold tracking-wide uppercase">
                  Resend in {formatCountdown(remainingSeconds)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
