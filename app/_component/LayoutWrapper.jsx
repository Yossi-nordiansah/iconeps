"use client"

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/super-admin")

  return (
    <>
      <SessionProvider>
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <Footer />}
      </SessionProvider>
    </>
  );
}
