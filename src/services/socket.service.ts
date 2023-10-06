import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const socket = io("https://chatappbacknewv2.adaptable.app/", {
  query: { token: Cookies.get("token") },
});

export const SocketService = {
  connectEvent(event: string) {
    socket.on(event, (data) => {
      console.log(data);
    });
  },
  disconnect() {
    socket.off();
  },
  connect() {
    socket.on("connect", () => {
      console.log(`Socket connected ${socket.id}`);
    });
  },
};
