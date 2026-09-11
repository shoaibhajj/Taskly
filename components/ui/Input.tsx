import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef } from "react";
import { FieldError } from "react-hook-form";
import EyeOff from "@/app/icons/eyeOff.svg";
import Eye from "@/app/icons/eye.svg";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error: FieldError | undefined;
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
}

const Input = ({
  togglePasswordVisibility,
  showPassword = false,
  error,
  id,
  type,
  placeholder,
  ...props
}: InputProps) => {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  return (
    <div className="relative mt-1 flex w-full items-center text-center">
      <input
        id={id}
        className={cn(
          hasError
            ? "bg-danger placeholder-error text-error"
            : "bg-surface-highest placeholder-surface-medium",
          "mt-label-gap w-full rounded border-0 py-3.5 pr-10 pl-3 outline-0",
        )}
        {...props}
        type={type ?? "text"}
        placeholder={error ? `${error.message}` : placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      />

      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="mt-3 h-6 w-6" />
          ) : (
            <Eye className="mt-3 h-6 w-6" />
          )}
        </button>
      )}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="text-error text-label-sm sr-only mt-1"
        >
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
