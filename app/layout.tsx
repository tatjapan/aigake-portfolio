import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import ClientOnlyFireFlies from "@/components/ClientOnlyFireFlies";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aigake AI Artwork",
  description: "Portfolio site of Aigake, creator of AI Artwork",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={clsx(inter.variable, "bg-background text-foreground font-inter")}
      >
        {children}
        <ClientOnlyFireFlies />
      </body>
    </html>
  );
}
