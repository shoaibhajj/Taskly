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

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        "text-body-md leading-btn  rounded-btn shadow-btn font-semibold ",
        variantClasses[variant ?? "primary"],
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
