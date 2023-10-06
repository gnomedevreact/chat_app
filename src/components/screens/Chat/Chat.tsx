"use client";

import {
  useAuthStore,
  useChatInfoStore,
  useChatStore,
} from "@/components/store/store";
import { useGetChat } from "@/hooks/useGetChat";
import { useGetUser } from "@/hooks/useGetUser";
import { useSendMessage } from "@/hooks/useSendMessage";
import { socket } from "@/services/socket.service";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const Chat = () => {
  const user = useAuthStore((state) => state.user);
  const { chat_id } = useChatInfoStore();
  const { currentChat, isLoading } = useGetChat(chat_id);
  const [messagesList, setMessagesList] = useState<Array<{ message: string }>>(
    []
  );
  const [usersList, setUsersList] = useState<
    Array<{ user_id: string; socketId: string; name: string; surname: string }>
  >([]);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const { sendMessage } = useSendMessage();
  const { back } = useRouter();

  useEffect(() => {
    socket.on(
      "onlineUsersList",
      (
        data: Array<{
          user_id: string;
          socketId: string;
          name: string;
          surname: string;
        }>
      ) => {
        const online_users = data.filter(
          (online_user) => online_user.user_id !== user?.id
        );
        setUsersList(online_users);
      }
    );
    socket.on("newPrivateMessage", (data) => {
      console.log(data);
      setMessagesList((prevValue) => [...prevValue, data]);
    });

    return () => {
      socket.off("onlineUsersList");
      socket.off("newPrivateMessage");
    };
  }, []);

  useEffect(() => {
    if (user && !isLoading && currentChat) {
      setMessagesList(currentChat?.messages);
    }
  }, [user, isLoading, currentChat]);

  if (isLoading) return null;

  const submit: SubmitHandler<{ message: string }> = (data) => {
    reset();
    setMessagesList((prevValue) => [...prevValue, data]);

    const dif_user_id = currentChat?.userIds.filter(
      (user_id) => user_id !== user.id
    )[0];

    const isOnline =
      usersList.filter((online_user) => online_user.user_id === dif_user_id)
        .length > 0;

    if (isOnline) {
      socket.emit("privateMessage", {
        message: data.message,
        recipient_id: dif_user_id,
        recipientSocketId: usersList[0].socketId,
      });
    } else {
      sendMessage({
        message: data.message,
        chat_id,
        from_id: user.id,
        to_id: dif_user_id,
      });
    }
  };

  return (
    <div className="h-full relative">
      <button className="text-white bg-blue p-2 mb-10" onClick={() => back()}>
        Back
      </button>
      <ul>
        {messagesList.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("message")}
          type="text"
          className="p-4 px-2 border-t border-slate-400 absolute bottom-0 w-full outline-none"
        />
      </form>
    </div>
  );
};
