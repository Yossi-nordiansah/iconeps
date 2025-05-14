"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AdminLayout = ({ children }) => {

    const pathName = usePathname();

    return (
        <div>
            <div className='absolute bg-primary h-full w-48 pt-24 z-10 text-white font-semibold'>
                <p className='text-xl mb-10 px-3'>nama admin</p>
                <ul className='flex-col'>
                    <Link href="/super-admin/pusbas/pelatihan" className={`py-4 border-y block px-3 ${pathName.startsWith("/super-admin/pusbas/pelatihan") ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Pelatihan</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/pusbas/informasi-periode" className={`py-4 border-b block px-3 ${pathName === "/super-admin/pusbas/informasi-periode" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Informasi Periode</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/pusbas/jadwal" className={`py-4 border-b block px-3 ${pathName === "/super-admin/pusbas/jadwal" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Jadwal</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/pusbas/cetak-laporan" className={`py-4 border-b block px-3 ${pathName === "/super-admin/pusbas/cetak-laporan" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Cetak Laporan</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/pusbas/instruktur" className={`py-4 border-b block px-3 ${pathName === "/super-admin/pusbas/instruktur" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Instruktur</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                    <Link href="/super-admin/pusbas/admin" className={`py-4 border-b block px-3 ${pathName === "/super-admin/pusbas/admin" ? "bg-yellow-400" : ""}`}>
                        <li className='flex justify-between'>
                            <p>Admin</p>
                            <img src="/icons/triangle.svg" alt="" className='w-5 rotate-90' />
                        </li>
                    </Link>
                </ul>
                <div className='flex items-center gap-4 px-3 py-4 border-b cursor-pointer'>
                    <img src="/icons/logout-1.svg" alt="" className='w-5' />
                    <p className='text-lg'>Logout</p>
                </div>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout