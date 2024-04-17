import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { KinContextProvider } from "@/components/kin.provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
          <KinContextProvider>
            {children}
          </KinContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
