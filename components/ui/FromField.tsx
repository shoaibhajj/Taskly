import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import Input from "./Input";

interface IFormField<TFieldValues extends FieldValues> extends Omit<
  ComponentPropsWithoutRef<"textarea">,
  "name" | "id"
> {
  id: string;
  label: string;
  type: string;
  name: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  children?: ReactNode;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

export const FormField = <TFieldValues extends FieldValues>({
  id,
  label,
  type,
  errors,
  placeholder,
  register,
  name,
  children,
  showPassword,
  togglePasswordVisibility,
  ...rest
}: IFormField<TFieldValues>) => {
  const error = errors[name];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
        >
          {label}
        </label>
        {children}
      </div>

      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          {...register(name)}
          {...rest}
          className={`bg-surface-highest w-full rounded-md p-2 outline-0 ${
            error ? "border-red-500" : "border-0"
          }`}
        />
      ) : (
        <Input
          id={id}
          type={type}
          {...register(name)}
          error={error}
          placeholder={placeholder}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
      )}

      {type === "textarea" && error && (
        <span className="text-sm text-red-500">{error.message as string}</span>
      )}
    </div>
  );
};
