export interface IMessage {
  id: string;
  createdAt: string;
  message: string;
  from_id: string;
  sender_id: string;
}

export interface IChat {
  id: string;
  messages: IMessage[];
  userIds: string[];
}

export interface IUserTypes {
  id: string;
  email: string;
  name: string;
  surname: string;
  chats: IChat[];
}
