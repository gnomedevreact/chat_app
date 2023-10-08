import { Socket, io } from "socket.io-client";
import Cookies from "js-cookie";

let instance: SocketService;

class SocketService {
  private socket: Socket;

  constructor() {
    if (instance) {
      throw new Error("Singleton instance error");
    }
    instance = this;

    this.socket = io("https://chatappbacknewv2.adaptable.app/", {
      autoConnect: false,
      query: { token: Cookies.get("token") },
    });

    this.socket.on("connect", () => {
      console.log("Connected to Socket.IO server! (approve)");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server!");
    });
  }

  connect() {
    if (!this.socket.disconnected) {
      this.socket.disconnect();
    }
    this.socket.connect();
    console.log("Connected Socket.IO server!");
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  off(event: string) {
    this.socket.off(event);
  }
}

const singleton = new SocketService();
export default singleton;
