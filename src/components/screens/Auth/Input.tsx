import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import cl from "classnames";
import { AuthFormProps } from "./AuthForm";

interface IInput {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: keyof AuthFormProps;
  classNames?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export const Input = ({
  register,
  error,
  name,
  classNames,
  placeholder,
  rules,
}: IInput) => {
  return (
    <label>
      <input
        className={cl(
          "w-full py-4 px-4 border-2 border-normalGreen outline-none rounded-xl text-lg font-normal",
          classNames
        )}
        type="text"
        {...register(name, rules)}
        placeholder={placeholder}
      />
      {error && <span className="text-[#B22222]">{error?.message}</span>}
    </label>
  );
};
