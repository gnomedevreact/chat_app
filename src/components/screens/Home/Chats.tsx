"use client";

import {
  useAuthStore,
  useChatInfoStore,
  useChatStore,
} from "@/components/store/store";
import { GENERAL_HELPERS } from "@/helpers/general.helpers";
import { useGetUser } from "@/hooks/useGetUser";
import { useSearchUser } from "@/hooks/useSearchUser";
import { SocketService, socket } from "@/services/socket.service";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormProps {
  search_param: string;
}

export const Chats = () => {
  const user = useAuthStore((state) => state.user);
  const { user_info, isLoading } = useGetUser(user?.id);
  const { setChatId } = useChatInfoStore();
  const { register, handleSubmit, reset } = useForm<IFormProps>();
  const [searchUserEmail, setSearchUserEmail] = useState("");
  useSearchUser(searchUserEmail);

  if (isLoading) return null;

  const handleSaveChatId = (id: string) => {
    setChatId(id);
  };

  const submit: SubmitHandler<IFormProps> = (data) => {
    console.log(data);
    reset();
    setSearchUserEmail(data.search_param);
  };

  return (
    <div className="pt-6 flex flex-col gap-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Inbox</h1>
        <button onClick={() => GENERAL_HELPERS.logout()}>logout</button>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("search_param")}
          type="text"
          className="w-full rounded-xl outline-none py-2 px-4 border border-gray-800"
          placeholder="Search..."
        />
      </form>
      <ul>
        {user_info?.chats.map((chat) => (
          <Link
            key={chat.id}
            href={"/chat/room"}
            // onClick={() => handleSaveChatId(chat.id)}
          >
            <li className="w-full px-2 py-3 text-lg font-normal text-darkGreen border-b-2 border-normalGreen">
              {chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].message
                : chat.id}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
