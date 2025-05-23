"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Swal from 'sweetalert2';

const AdminLayout = ({ children }) => {

    const pathName = usePathname();
    const { data: session } = useSession();

    return (
        <div>
            <div className='absolute bg-primary h-full w-48 pt-24 z-10 text-white font-semibold'>
                <p className='text-xl mb-10 px-3'>{session?.user?.name}</p>
                <ul className='flex-col'>
                    <Link href="/super-admin/puskom/pelatihan" className={`py-4 border-y block px-3 ${pathName.startsWith("/super-admin/puskom/pelatihan") ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Pelatihan</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/puskom/informasi-periode" className={`py-4 border-b block px-3 ${pathName === "/super-admin/puskom/informasi-periode" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Informasi Periode</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/puskom/jadwal" className={`py-4 border-b block px-3 ${pathName === "/super-admin/puskom/jadwal" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Jadwal</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/puskom/cetak-laporan" className={`py-4 border-b block px-3 ${pathName === "/super-admin/puskom/cetak-laporan" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Cetak Laporan</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/puskom/instruktur" className={`py-4 border-b block px-3 ${pathName === "/super-admin/puskom/instruktur" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Instruktur</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/puskom/admin" className={`py-4 border-b block px-3 ${pathName === "/super-admin/puskom/admin" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Admin</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                </ul>
                <div
                    className="flex items-center gap-4 px-3 py-4 border-b cursor-pointer"
                    onClick={async () => {
                        const result = await Swal.fire({
                            title: "Keluar dari akun?",
                            text: "Anda akan keluar dari sesi login.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Ya, logout",
                            cancelButtonText: "Batal",
                        });

                        if (result.isConfirmed) {
                            await signOut({ callbackUrl: "/" });
                        }
                    }}
                >
                    <Image src="/icons/logout-1.svg" alt="" width={20} height={20} />
                    <p className="text-lg">Logout</p>
                </div>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout