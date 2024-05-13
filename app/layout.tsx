import type { Metadata } from "next";
import { Inter, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { Toaster } from "@/components/ui/sonner";
import FormDataProvider from "./context/formdata";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "encrypt project",
  description:
    "Проект для демонстрации алгоритмов шифрования/дешифрации. Сделано PAnanasik и Lyakakoy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative bg-background text-foreground`}
      >
        <Header />
        <FormDataProvider>{children}</FormDataProvider>
        <Toaster />
      </body>
    </html>
  );
}
