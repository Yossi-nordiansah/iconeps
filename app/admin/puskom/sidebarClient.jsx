"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Swal from 'sweetalert2';
import { usePathname } from "next/navigation";

export default function SidebarClient({ name }) {

    const pathname = usePathname();

    return (
        <div className="absolute bg-primary h-full w-48 pt-24 z-10 text-white font-semibold">
            <p className="text-xl mb-10 px-3">{name}</p>
            <ul className="flex-col border-t">
                {[
                    { href: "/admin/puskom/pelatihan", label: "Pelatihan" },
                    { href: "/admin/puskom/informasi-periode", label: "Informasi Periode" },
                    { href: "/admin/puskom/jadwal", label: "Jadwal" },
                    { href: "/admin/puskom/cetak-laporan", label: "Cetak Laporan" },
                    { href: "/admin/puskom/instruktur", label: "Instruktur" },
                ].map(({ href, label }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`py-4 border-b block px-3 ${isActive ? "bg-yellow-400" : ""
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <p>{label}</p>
                                    <Image
                                        src="/icons/triangle.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                        className="rotate-90"
                                    />
                                </div>
                            </Link>
                        </li>
                    );
                })}
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
    );;
}
