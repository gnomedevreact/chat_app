import { ChatService } from "@/services/chat.service";
import { useQuery } from "@tanstack/react-query";

export const useGetChat = (id: string) => {
  const { data: currentChat, isLoading } = useQuery(
    ["get chat"],
    () => ChatService.getChatById(id),
    {
      enabled: !!id,
      select: ({ data }) => data,
    }
  );

  return { currentChat, isLoading };
};
