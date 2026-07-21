import type { Metadata } from "next";
import QueryLayout from "./Layouts/QueryLayout";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ten thousand to-do",
  description:
    "A modern, highly performant Todo application built with Next.js (App Router), TanStack Query, React Hook Form, and Shadcn UI. The application relies entirely on URL search parameters to drive its data state, enabling shareable and bookmarkable filtering, searching, and pagination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="h-screen flex flex-col p-4 md:justify-center">
        <QueryLayout>{children}</QueryLayout>
      </body>
    </html>
  );
}
