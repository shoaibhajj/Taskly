"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ENDPOINTS } from "@/constants/endpoints";

import { getAccessToken, storeSession } from "@/lib/auth/session";
import { LogInFormData, logInSchema } from "../schemas/login";
import { SignInResponse } from "../types";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [checkedRememberMe, setCheckedRememberMe] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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

  const onSubmit = async (
    data: LogInFormData,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    try {
      const response = await api.post<SignInResponse>(ENDPOINTS.LOGIN, data);
      const { access_token, refresh_token } = response;

      storeSession({ access_token, refresh_token }, checkedRememberMe);
      if (getAccessToken()) {
        router.push("/projects");
      }
    } catch (error) {
      console.log(error);

      const err = error as { message: string; status: number };

      if (err.status === 400) toast.error(`Invalid email or password.`);
    }
  };

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
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-85.5 flex-col gap-6 md:w-full"
      >
        <div>
          <label
            htmlFor="email"
            className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={errors.email}
            placeholder="curator@workspace.com"
          />
        </div>
        <div className="gap-4 md:flex">
          <div className="w-full">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
              >
                Password
              </label>
              <Button variant="secondary" className="text-label-sm">
                Forgot?
              </Button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password}
              placeholder="••••••••"
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
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
