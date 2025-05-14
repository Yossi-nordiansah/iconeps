"use client"
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState } from "react";

const mahasiswa = [
    {
        nim: "20250101",
        nama: "Rina Anggraini",
        fakultas: "Ilmu Komputer",
        prodi: "Informatika",
        kelas: "A"
    },
    {
        nim: "20250102",
        nama: "Ahmad Fauzan",
        fakultas: "Teknik",
        prodi: "Teknik Elektro",
        kelas: "B"
    },
    {
        nim: "20250103",
        nama: "Siti Nurhaliza",
        fakultas: "Ekonomi",
        prodi: "Akuntansi",
        kelas: "C"
    },
    {
        nim: "20250104",
        nama: "Bagus Prasetyo",
        fakultas: "Ilmu Sosial",
        prodi: "Sosiologi",
        kelas: "A"
    },
    {
        nim: "20250105",
        nama: "Dewi Lestari",
        fakultas: "Hukum",
        prodi: "Ilmu Hukum",
        kelas: "B"
    }
];

export default function RemidiAdmin() {

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    console.log(pathname)

    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];

    return (
        <div className="p-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/super-admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <ArrowPathIcon className="h-5" />
                        <span className="text-base font-semibold">Remidial</span>
                        <span className="text-base font-semibold">40</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-black overflow-hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Cari Peserta..."
                            className="outline-none px-3 py-1 w-64"
                        />
                        <button className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => setIsOpen(true)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakultas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mahasiswa.map((mhs, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nim}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.fakultas}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.prodi}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{mhs.kelas}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Pencil size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Eye size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                <Mail size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
        </div>
    );
}
