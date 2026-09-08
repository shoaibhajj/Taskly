import { cn } from "@/utils/cn";
import { ComponentPropsWithRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
interface ButtonProps extends ComponentPropsWithRef<"button"> {
  label: string;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-gradient text-white ",
  secondary: "bg-white  text-primary",
  ghost: "bg-white  text-surface-medium",
};

const Button = ({ label, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "text-body-md leading-btn px-btn-x py-btn-y rounded-btn shadow-btn font-semibold",
        variantClasses[variant ?? "primary"],
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
