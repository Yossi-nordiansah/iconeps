"use client"

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/super-admin")
  const isUserPage = pathname.startsWith("/user");

  // Tentukan title dinamis
  let pageTitle = "Iconeps";
  if (isAdminPage) pageTitle = "Dashboard Admin - Iconeps";
  else pageTitle = "Dashboard User - Iconeps";
  return (
    <>
      <SessionProvider>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <Footer />}
      </SessionProvider>
    </>
  );
}
