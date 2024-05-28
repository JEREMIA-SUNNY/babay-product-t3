"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // Redirect to /login if the current path is not /login
    if (isLoggedIn !== "true" && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
