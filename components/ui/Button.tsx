import { cn } from "@/utils/cn";
import { ComponentPropsWithRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-gradient text-white ",
  secondary: "bg-white  text-primary",
  ghost: "bg-white  text-slate-mid!",
};

const Button = ({
  children,
  variant,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        "text-body-md leading-btn rounded-card shadow-btn focus-visible:outline-primary text-center font-semibold focus-visible:outline-offset-2 disabled:opacity-50",
        variantClasses[variant ?? "primary"],
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
