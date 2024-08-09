import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aiD: Customer Support",
  description: "A landing page for our AI Chat assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      className={twMerge(inter.className, "bg-black text-white antialiased" )}
      >
        {children}
      </body>
      
    </html>
  );
}
