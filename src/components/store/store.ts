import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface IAuthStoreState {
  user: {
    id: string;
    email: string;
  };
  setUser: (value: IValueState) => void;
}

interface IValueState {
  id: string;
  email: string;
}

interface IChatStore {
  socket_id: string | null;
  setSocketId: (socket_id: string) => void;
}

interface IChatInfoStore {
  chat_id: string;
  setChatId: (chat_id: string) => void;
}

const user_cookie = Cookies.get("user");

export const useAuthStore = create<IAuthStoreState>()(
  devtools((set) => ({
    user: user_cookie ? JSON.parse(user_cookie) : {},
    setUser: (value: IValueState) => set({ user: value }),
  }))
);

export const useChatStore = create<IChatStore>()(
  devtools((set) => ({
    socket_id: null,
    setSocketId: (value: string) => set({ socket_id: value }),
  }))
);

export const useChatInfoStore = create<IChatInfoStore>()(
  devtools(
    persist(
      (set) => ({
        chat_id: "",
        setChatId: (chat_id) => set({ chat_id }),
      }),
      {
        name: "chat_id",
      }
    )
  )
);
