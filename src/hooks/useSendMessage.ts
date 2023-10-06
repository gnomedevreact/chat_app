import { ChatService } from "@/services/chat.service";
import { ISendMessage } from "@/types/chat.types";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  const { mutate: sendMessage } = useMutation(
    ["send message"],
    (data: ISendMessage) => ChatService.sendMessage(data)
  );

  return { sendMessage };
};
