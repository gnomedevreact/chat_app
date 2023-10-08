import { useAuthStore, useChatInfoStore } from "@/components/store/store";
import { ChatService } from "@/services/chat.service";
import { UserService } from "@/services/user.service";
import { ISendMessage } from "@/types/chat.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSearchUser = (email: string) => {
  const user = useAuthStore((state) => state.user);
  const { setChatId } = useChatInfoStore();
  const { push } = useRouter();

  const { mutate } = useMutation(
    ["create room"],
    (data: Omit<Omit<ISendMessage, "chat_id">, "message">) =>
      ChatService.createChatRoom(data),
    {
      onSuccess({ data }) {
        setChatId(data.id);
        push("/chat");
      },
    }
  );

  const {} = useQuery(
    ["get user by email"],
    () => UserService.getUserByEmail(email),
    {
      enabled: email !== "",
      onSuccess({ data }) {
        mutate({ to_id: data.id, from_id: user.id });
      },
    }
  );
};
