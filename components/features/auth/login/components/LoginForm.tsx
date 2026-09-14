"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LogInFormData, logInSchema } from "../schemas/login";
import { useLogin } from "../hooks/useLogin";
import { FormField } from "@/components/ui/FromField";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [checkedRememberMe, setCheckedRememberMe] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormData>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="mx-auto mb-36.75 flex h-screen flex-col items-center bg-white md:w-xl">
      <div className="flex flex-col justify-end">
        <h1 className="text-headline-lg leading-headline-lg text-slate-dark mt-11 pt-22 font-semibold tracking-tight">
          Welcome Back
        </h1>

        <p className="text-body-md leading-body-md text-slate-mid md:text-c mt-1.5 w-58 text-center">
          Please enter your details to access your workspace.
        </p>
      </div>
      <form
        onSubmit={handleSubmit((data) => login(data, checkedRememberMe))}
        className="flex w-85.5 flex-col gap-6 md:w-full"
      >
        <FormField<LogInFormData>
          id="email"
          type="email"
          register={register}
          errors={errors}
          label="Email"
          name="email"
          placeholder="curator@workspace.com"
        />

        <div className="gap-4 md:flex">
          <FormField<LogInFormData>
            id="password"
            type={showPassword ? "text" : "password"}
            register={register}
            errors={errors}
            label="Password"
            name="password"
            placeholder="••••••••"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          >
            <Link
              href="/forgot-password"
              className="text-primary text-label-sm font-semibold"
            >
              Forgot?
            </Link>
          </FormField>
        </div>

        <div className="flex w-full flex-col justify-between">
          <div className="text-slate-mid text-body-md mt-6 flex items-center gap-3 font-medium">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              onChange={() => setCheckedRememberMe((prev) => !prev)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="px-btn-x mt-6 w-full py-4"
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </Button>
        </div>
      </form>

      <div className="mt-1 flex h-58.75 items-end justify-center gap-1">
        <p className="text-body-md text-slate-mid">
          Don&apos;t have an account?{" "}
        </p>
        <Link
          href="/sign-up"
          className="text-primary text-body-md font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
