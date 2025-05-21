import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"; // gunakan alias jika pakai `jsconfig.json` atau `tsconfig.json`
import { redirect } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
// import { usePathname } from 'next/navigation'; // usePathname hanya bisa dipakai di client, jadi perlu pendekatan lain

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      {/* Navbar */}
      <div className='absolute z-20 w-full flex bg-secondary py-2 px-5 justify-between items-center'>
        <div className='flex items-center text-white gap-4'>
          <Image src="/images/iconeps_logo.png" alt="" width={44} height={44} />
          <h1 className='text-3xl font-robotoBold'>Halaman Admin</h1>
        </div>
        <h1 className='text-3xl font-robotoBold text-white'>PUSKOM</h1>
      </div>

      {/* Sidebar */}
      <div className='absolute bg-primary h-full w-48 pt-24 z-10 text-white font-semibold'>
        <p className='text-xl mb-10 px-3'>{session.user.name}</p>
        <ul className='flex-col'>
          {[
            { href: "/admin/puskom/pelatihan", label: "Pelatihan" },
            { href: "/admin/puskom/informasi-periode", label: "Informasi Periode" },
            { href: "/admin/puskom/jadwal", label: "Jadwal" },
            { href: "/admin/puskom/cetak-laporan", label: "Cetak Laporan" },
            { href: "/admin/puskom/instruktur", label: "Instruktur" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`py-4 border-b block px-3`}>
                <div className='flex justify-between'>
                  <p>{label}</p>
                  <Image src="/icons/triangle.svg" alt="" width={20} height={20} className='rotate-90' />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex items-center gap-4 px-3 py-4 border-b cursor-pointer'>
          <Image src="/icons/logout-1.svg" alt="" width={20} height={20} />
          <p className='text-lg'>Logout</p>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
