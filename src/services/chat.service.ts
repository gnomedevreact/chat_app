import { ISendMessage } from "./../types/chat.types";
import axiosRequest from "@/api/axios.settings";
import { IChat } from "@/types/user.types";

export const ChatService = {
  async getChatById(id: string) {
    return await axiosRequest.get<IChat>(`/chat/get_chat/${id}`);
  },

  async sendMessage({ message, chat_id, from_id, to_id }: ISendMessage) {
    return await axiosRequest.post("/message", {
      message,
      chat_id,
      from_id,
      to_id,
    });
  },

  async createChatRoom({
    to_id,
    from_id,
  }: Omit<Omit<ISendMessage, "chat_id">, "message">) {
    return await axiosRequest.post("/chat/create", { to_id, from_id });
  },
};
