'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UnauthorizedPage from "@/app/_component/unauthorized";

export default function UnauthorizedWrapper() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // arahkan ke halaman lain, misalnya dashboard umum
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <UnauthorizedPage />;
}
