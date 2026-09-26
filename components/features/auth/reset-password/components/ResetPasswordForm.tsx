"use client";

import Button from "@/components/ui/Button";
import Check from "@/app/icons/check.svg";
import Success from "@/app/icons/success.svg";
import { FormField } from "@/components/ui/FromField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  passwordSchema,
  resetPasswordFormData,
  resetPasswordSchema,
} from "../schemas/reset-password";

const checkListRules = [
  { id: "length-failed", label: "8–64 characters" },
  { id: "uppercase-failed", label: "One uppercase letter" },
  { id: "lowercase-failed", label: "One lowercase letter" },
  { id: "digit-failed", label: "At least one digit" },
  { id: "special-failed", label: "One special character" },
];

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  const { reset, linkStatus, isLoading, isSuccess, error } = useResetPassword();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const zodResult = passwordSchema.safeParse(passwordValue);
  const zodErrors = zodResult.success
    ? []
    : zodResult.error.issues.map((issue) => issue.message);

  if (linkStatus === "checking") {
    return (
      <div className="mx-auto flex min-h-screen items-center justify-center">
        <p role="status" className="text-body-md text-slate-mid">
          Checking reset link...
        </p>
      </div>
    );
  }

  if (linkStatus === "invalid") {
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-headline-lg text-slate-dark font-semibold">
          Invalid or expired reset link
        </h1>
        <p className="text-body-md text-slate-mid mt-2">
          Request a new password reset link and try again.
        </p>
        <Link
          href="/forgot-password"
          className="text-primary mt-5 font-semibold"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-headline-lg text-slate-dark font-semibold">
          Password updated
        </h1>
        <p className="text-body-md text-slate-mid mt-2">
          Your password has been updated successfully.
        </p>
        <Link href="/login" className="text-primary mt-5 font-semibold">
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mb-36.75 flex flex-col items-center bg-white md:w-xl">
      <h1 className="text-headline-lg leading-headline-lg text-slate-dark mt-11 font-semibold tracking-tight">
        Create a New Password
      </h1>

      <p className="text-body-md leading-body-md text-slate-mid mt-1.5 max-w-85.5 text-center">
        Create a new, strong password to secure your account.
      </p>

      <form
        onSubmit={handleSubmit(reset)}
        className="mt-6 flex w-full flex-col gap-y-6 px-4 md:px-0"
      >
        <FormField<resetPasswordFormData>
          id="password"
          type={showPassword ? "text" : "password"}
          register={register}
          errors={errors}
          label="New Password"
          name="password"
          placeholder="Password"
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <FormField<resetPasswordFormData>
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          register={register}
          errors={errors}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Repeat your password"
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        <div className="rounded-card hidden w-full flex-col bg-slate-50 p-4 md:flex">
          <p className="text-label-sm text-slate-mid mb-3 font-bold uppercase">
            Security requirements
          </p>

          <ul className="space-y-2" aria-label="Password requirements">
            {checkListRules.map((rule) => {
              let isPassed: boolean | null = null;

              if (passwordValue !== "") {
                isPassed =
                  rule.id === "length-failed"
                    ? passwordValue.length >= 8 && passwordValue.length <= 64
                    : !zodErrors.includes(rule.id);
              }

              return (
                <li key={rule.id} className="flex items-center space-x-2">
                  {isPassed === true ? (
                    <Success
                      aria-hidden="true"
                      className="text-success h-4 w-4"
                    />
                  ) : (
                    <Check
                      aria-hidden="true"
                      className="text-slate-light h-4 w-4"
                    />
                  )}

                  <span className="text-label-sm text-slate-mid font-medium">
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {error && (
          <p role="alert" className="text-label-sm text-red-500">
            {error.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          aria-busy={isSubmitting || isLoading}
          className="rounded-b-card px-btn-x mt-2 w-full py-4"
        >
          {isSubmitting || isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>

      <Link
        href="/login"
        className="text-primary text-body-md mt-5 flex items-center gap-1 font-semibold"
      >
        <span aria-hidden="true">←</span> Back to log in
      </Link>
    </div>
  );
}
