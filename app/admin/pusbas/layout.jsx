import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import Image from 'next/image';
import SidebarClient from "./sidebarClient";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allowedRoles = ["admin_pusbas", "super_admin"];

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized");
  }

  return (
    <div>
      {/* Navbar */}
      <div className='absolute z-20 w-full flex bg-secondary py-2 px-5 justify-between items-center'>
        <div className='flex items-center text-white gap-4'>
          <Image src="/images/iconeps_logo.png" alt="" width={44} height={44} />
          <h1 className='text-3xl font-robotoBold'>Halaman Admin</h1>
        </div>
        <h1 className='text-3xl font-robotoBold text-white'>PUSBAS</h1>
      </div>

      {/* Sidebar */}
      <SidebarClient name={session.user.name} />

      {/* Content */}
      {children}
    </div>
  );
}
