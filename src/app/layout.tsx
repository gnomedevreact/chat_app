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
      <head>
        <script
          data-project-id="JmV61jJDiePsc2r0wZYRRR0ZGrzwsicox6YCwBdy"
          src="https://snippet.meticulous.ai/v1/meticulous.js"
        />
      </head>
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
