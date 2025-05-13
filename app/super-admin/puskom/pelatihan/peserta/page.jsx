"use client";
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { UsersIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState } from "react";

const mahasiswa = [
    {
        nim: "20250101",
        nama: "Rina Anggraini",
        fakultas: "Ilmu Komputer",
        prodi: "Informatika",
        semester: 6,
        tanggalDaftar: "2025-03-12",
        pilihanKelas: "Weekend"
    },
    {
        nim: "20250102",
        nama: "Ahmad Fauzan",
        fakultas: "Teknik",
        prodi: "Teknik Elektro",
        semester: 4,
        tanggalDaftar: "2025-04-02",
        pilihanKelas: "Weekday"
    },
    {
        nim: "20250103",
        nama: "Siti Nurhaliza",
        fakultas: "Ekonomi",
        prodi: "Akuntansi",
        semester: 2,
        tanggalDaftar: "2025-02-20",
        pilihanKelas: "Weekend"
    },
    {
        nim: "20250104",
        nama: "Bagus Prasetyo",
        fakultas: "Ilmu Sosial",
        prodi: "Sosiologi",
        semester: 8,
        tanggalDaftar: "2025-01-15",
        pilihanKelas: "Weekday"
    },
    {
        nim: "20250105",
        nama: "Dewi Lestari",
        fakultas: "Hukum",
        prodi: "Ilmu Hukum",
        semester: 6,
        tanggalDaftar: "2025-03-30",
        pilihanKelas: "Weekend"
    }
];

export default function PesertaAdmin() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState([]);

    console.log(pathname)

    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];

    const toggleSemester = (sem) => {
        setSelectedSemester((prev) =>
            prev.includes(sem)
                ? prev.filter((s) => s !== sem)
                : [...prev, sem]
        );
    };

    return (
        <div className="p-6 overflow-y-auto">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <UsersIcon className="h-5" />
                        <span className="text-base font-semibold">Peserta</span>
                        <span className="text-base font-semibold">40</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
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
                    <div className="px-2 py-2 border bg-gray-300 rounded cursor-pointer">
                        <select className="bg-transparent outline-none">
                            <option value="" disabled>Kelas</option>
                            <option value="">Semua Kelas</option>
                            <option value="">Kelas C (Weekend Online)</option>
                            <option value="">Kelas A (Weekend Offline)</option>
                            <option value="">Kelas B (Weekend Offline)</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => setIsOpen(true)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Tabel Pendaftar */}
            <div>
                <h1 className="text-xl font-radjdhani_bold bg-blue-500 px-1">Kelas C (Weekend Online)</h1>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakultas</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mahasiswa.map((mhs, idx) => (
                            <tr key={idx}>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nim}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nama}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.fakultas}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.prodi}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-gray-700">{mhs.semester}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
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
            </div>


            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
        </div>
    );
}
