import { MainProvider } from "@/components/providers/MainProvider";
import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Modern chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
