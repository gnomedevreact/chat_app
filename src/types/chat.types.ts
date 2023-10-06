export interface ISendMessage {
  message: string;
  chat_id: string;
  from_id: string;
  to_id: string | undefined;
}
