"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Success from "@/app/icons/success.svg";
import Check from "@/app/icons/check.svg";
import X from "@/app/icons/x.svg";
import { signUpSchema, passwordSchema, SignUpFormData } from "@/schemas/signup";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const checkListRules = [
  { id: "length-failed", label: "At least 8 characters" },
  { id: "mixed-failed", label: "One uppercase, lowercase, and digit" },
  { id: "special-failed", label: "One special character" },
];

interface SignUpResponse {
  code?: number;
  error_code?: string;
  msg?: string;
  access_token: string;
  refresh_token: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await api.post<SignUpResponse>("/auth/v1/signup", data);
      if (response) {
        router.push("/login");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

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
    <div className="s mx-auto flex flex-col items-center bg-white md:w-xl">
      <h1 className="text-headline-lg leading-headline-lg text-slate-dark mt-11 font-semibold tracking-tight">
        Create your workspace
      </h1>

      <p className="text-body-md leading-body-md text-slate-mid md:text-c mt-1.5 max-w-85.5 md:hidden md:text-nowrap">
        Join the curated environment for institutional trust and task precision.
      </p>

      <p className="text-body-md leading-body-md text-slate-mid md:text-c mt-1.5 hidden max-w-85.5 md:block md:text-nowrap">
        Join the editorial approach to task management.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          />
          <p className="text-slate-light text-label-sm">
            3-50 characters, letters only.
          </p>
        </div>
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
            placeholder="yourname@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="jobTitle"
            className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
          >
            job Title (optional)
          </label>
          <Input
            id="jobTitle"
            type="text"
            {...register("jobTitle")}
            error={errors.jobTitle}
            placeholder="e.g. Project Manager"
          />
        </div>
        <div className="gap-4 md:flex">
          <div>
            <label
              htmlFor="password"
              className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
            >
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password}
              placeholder="Password"
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
            >
              confirm Password
            </label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Repeat your password"
              error={errors.confirmPassword}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-b-card px-btn-x py-btn-y mt-6 w-full"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>
      </form>

      <div className="hidden w-full flex-col p-4 md:flex">
        <ul className="space-y-2" aria-label="Password requirements">
          {checkListRules.map((rule) => {
            let status: boolean | null = null;
            if (passwordValue !== "") {
              status = !zodErrors.includes(rule.id);
            }
            return (
              <li key={rule.id} className="flex items-center space-x-2 text-sm">
                {status === null && <Check className="h-4 w-4 text-gray-300" />}
                {status === true && (
                  <Success className="h-4 w-4 text-green-500" />
                )}
                {status === false && <X className="h-4 w-4 text-red-500" />}

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
        <Link href={"/login"}>
          <Button variant="secondary">login</Button>
        </Link>
      </div>
    </div>
  );
}
