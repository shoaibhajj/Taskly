import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error: string | null;
}

const Input = ({ label, error, id, type, ...props }: InputProps) => {
  const hasError = Boolean(error);
  return (
    <div className="input-group mt-1">
      <label
        htmlFor={id}
        className={cn(
          hasError ? "text-error" : "text-surface-medium",
          "text-label-xs leading-label-xs block font-bold",
        )}
      >
        {label}
      </label>
      <input
        type={type ?? "text"}
        id={id}
        className={cn(
          hasError
            ? "bg-danger placeholder-error text-error"
            : "bg-surface-highest placeholder-surface-medium",
          "mt-label-gap w-full border-0 px-1 py-3.5",
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
