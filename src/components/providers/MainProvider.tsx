"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/store";
import { usePathname, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SocketService from "@/services/socket.service";

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (pathname === "/auth") {
      SocketService.disconnect();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      SocketService.connect();
    }
    if (Object.keys(user).length !== 0 && pathname === "/auth") {
      replace("/");
    }
    if (Object.keys(user).length === 0) {
      replace("/auth");
    }
  }, [user]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
