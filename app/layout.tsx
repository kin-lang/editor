import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./utils/providers/context.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kin Lang - Online Editor",
  description: "Edit and run Kin Lang code online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
