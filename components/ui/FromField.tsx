import { ReactNode } from "react";
import Input from "./Input";

import {
  FieldErrors,
  FieldValues,
  Path,
 
  UseFormRegister,
} from "react-hook-form";

interface IFormField<TFieldValues extends FieldValues> {
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
}: IFormField<TFieldValues>) => {
  return (
    <div className="w-full">
      <div className=" flex justify-between">
        <label
          htmlFor={id}
          className="text-label-sm text-slate-mid leading-label-sm inline-block text-center font-bold uppercase"
        >
          {label}
        </label>
        {children}
      </div>
      <Input
        id={id}
        type={type}
        {...register(name)}
        error={errors[name]}
        placeholder={placeholder}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
    </div>
  );
};
