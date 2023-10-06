import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: string) => {
  const { data: user_info, isLoading } = useQuery(
    ["get user"],
    () => UserService.getUserById(id),
    {
      select: ({ data }) => data,
      enabled: !!id,
    }
  );

  return { user_info, isLoading };
};
