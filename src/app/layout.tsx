"use client";
import { Inter } from "next/font/google";
import { useEffect, ReactNode } from "react";
import "./globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
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
      <body className={inter.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
