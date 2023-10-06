import { useAuthStore } from "@/components/store/store";
import { UserService } from "@/services/user.service";
import { IAuth } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useAuthMutations = () => {
  const { setUser } = useAuthStore();

  const { mutate: registerUser } = useMutation(
    ["register"],
    (data: IAuth) => UserService.registerUser(data),
    {
      onSuccess({ data: { user, token } }) {
        setUser({ email: user.email, id: user.id });
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
      },
    }
  );

  const { mutate: loginUser } = useMutation(
    ["login"],
    (data: IAuth) => UserService.loginUser(data),
    {
      onSuccess({ data: { user, token } }) {
        setUser({ email: user.email, id: user.id });
        Cookies.set("token", token);
        Cookies.set("user", JSON.stringify(user));
      },
    }
  );

  return { registerUser, loginUser };
};
