"use client";

import { Button } from "@/components/shared/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Input";
import { useAuthMutations } from "@/hooks/useAuthMutations";
import { useState } from "react";

const emailPattern =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export interface AuthFormProps {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export const AuthForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthFormProps>({
    reValidateMode: "onChange",
  });
  const { registerUser, loginUser } = useAuthMutations();
  const [isLogin, setIsLogin] = useState(false);

  const submit: SubmitHandler<AuthFormProps> = (data) => {
    if (isLogin) {
      loginUser(data);
    } else {
      registerUser(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 w-full"
    >
      <h1 className="text-2xl font-medium">Authorization page</h1>
      <Input
        register={register}
        name="email"
        placeholder="Email"
        rules={{
          required: { message: "This field is required", value: true },
          pattern: {
            value: emailPattern,
            message: "Please provide correct email",
          },
        }}
        error={errors.email}
      />
      <Input
        register={register}
        name="password"
        placeholder="Password"
        rules={{ required: { message: "This field is required", value: true } }}
        error={errors.password}
      />
      {!isLogin && (
        <>
          <Input
            register={register}
            name="name"
            placeholder="Name"
            rules={{
              required: { message: "This field is required", value: true },
            }}
            error={errors.name}
          />
          <Input
            register={register}
            name="surname"
            placeholder="Surname"
            rules={{
              required: { message: "This field is required", value: true },
            }}
            error={errors.surname}
          />
        </>
      )}
      <div className="flex items-center w-full gap-6">
        <Button title="Proceed" classNames="mt-6" />
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </div>
    </form>
  );
};
