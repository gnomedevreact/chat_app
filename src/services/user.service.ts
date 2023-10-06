import axiosRequest from "@/api/axios.settings";
import { IAuth, IAuthResponse } from "@/types/auth.types";
import { IUserTypes } from "@/types/user.types";

export const UserService = {
  async registerUser({ email, password, name, surname }: IAuth) {
    return await axiosRequest.post<IAuthResponse>("/user/register", {
      email,
      password,
      name,
      surname,
    });
  },

  async loginUser({ email, password }: IAuth) {
    return await axiosRequest.post<IAuthResponse>("/user/login", {
      email,
      password,
    });
  },

  async getUserById(id: string) {
    return await axiosRequest.get<IUserTypes>(`/user/get_user/${id}`);
  },

  async getUserByEmail(email: string) {
    return await axiosRequest.get<IUserTypes>(
      `/user/get_user_by_email/${email}`
    );
  },
};
