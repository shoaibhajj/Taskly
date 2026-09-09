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
  ...props
}: InputProps) => {
  const hasError = Boolean(error);

  return (
    <div className="relative mt-1 flex w-full  items-center">
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
      />

      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
