"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Success from "@/app/icons/success.svg";
import Check from "@/app/icons/check.svg";
import {
  signUpSchema,
  passwordSchema,
  SignUpFormData,
} from "@/components/features/auth/signup/schemas/signup";
import Link from "next/link";
import { useSignUp } from "../hooks/useSignUp";
import { FormField } from "@/components/ui/FromField";

const checkListRules = [
  { id: "length-failed", label: "At least 8 characters" },
  { id: "mixed-failed", label: "One uppercase, lowercase, and digit" },
  { id: "special-failed", label: "One special character" },
];

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { signUp } = useSignUp();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
    : zodResult.error.issues.map((i) => i.message);

  return (
    <div className="mx-auto mb-36.75 flex flex-col items-center bg-white md:w-xl">
      <h1 className="text-headline-lg leading-headline-lg text-slate-dark mt-11 font-semibold tracking-tight">
        Create your workspace
      </h1>

      <p className="text-body-md leading-body-md text-slate-mid md:text-c mt-1.5 max-w-85.5 md:hidden md:text-nowrap">
        Join the curated environment for institutional trust and task precision.
      </p>

      <p className="text-body-md leading-body-md text-slate-mid md:text-c mt-1.5 hidden max-w-85.5 md:block md:text-nowrap">
        Join the editorial approach to task management.
      </p>

      <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-y-6">
        <div>
          <label
            htmlFor="name"
            className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
          >
            name
          </label>
          <Input
            id="name"
            {...register("name")}
            error={errors.name}
            placeholder="Enter your full name"
            aria-describedby="name-hint"
          />
          <p id="name-hint" className="text-slate-light text-label-sm">
            3-50 characters, letters only.
          </p>
        </div>
        <FormField<SignUpFormData>
          id="email"
          type="email"
          register={register}
          errors={errors}
          label="Email"
          name="email"
          placeholder="curator@workspace.com"
        />

        <FormField<SignUpFormData>
          id="jobTitle"
          type="jobTitle"
          register={register}
          errors={errors}
          label="job Title (optional)"
          name="jobTitle"
          placeholder="e.g. Project Manager"
        />
        <div className="gap-4 md:flex">
          <FormField<SignUpFormData>
            id="password"
            type={showPassword ? "text" : "password"}
            register={register}
            errors={errors}
            label="job Title (optional)"
            name="password"
            placeholder="Password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <FormField<SignUpFormData>
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            register={register}
            errors={errors}
            label="job Title (optional)"
            name="confirmPassword"
            placeholder="Repeat your password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="rounded-b-card px-btn-x mt-6 w-full py-4"
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </Button>
      </form>

      <div className="hidden w-full flex-col p-4 md:flex">
        <ul className="space-y-2" aria-label="Password requirements">
          {checkListRules.map((rule) => {
            let isPassed: boolean | null = null;
            if (passwordValue !== "") {
              isPassed = !zodErrors.includes(rule.id);
            }
            return (
              <li key={rule.id} className="flex items-center space-x-2 text-sm">
                {isPassed === true ? (
                  <Success
                    aria-hidden="true"
                    className="text-success h-4 w-4"
                  />
                ) : (
                  <Check
                    aria-hidden="false"
                    className="text-slate-light h-4 w-4"
                  />
                )}
                <span
                  className={`text-slate-mid font-medium transition-colors duration-200`}
                >
                  {rule.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-1 flex items-center justify-center gap-1">
        <p className="text-body-md text-slate-mid">Already have an account? </p>
        <Link href="/login" className="text-primary text-body-md font-semibold">
          Log in
        </Link>
      </div>
    </div>
  );
}
