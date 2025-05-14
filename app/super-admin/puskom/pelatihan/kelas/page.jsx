"use client";
import { Trash2, Pencil, Plus } from "lucide-react";
import { PresentationChartBarIcon, CalendarDateRangeIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import KelasForm from "@/app/_component/admin/formKelas";

const dataKelas = [
    {
        namaKelas: "A",
        instruktur: "Instruktur A",
        tipeKelas: "Weekend Online",
        jumlahPeserta: 0
    },
    {
        namaKelas: "B",
        instruktur: "Instruktur B",
        tipeKelas: "Weekday Offline",
        jumlahPeserta: 0
    },
    {
        namaKelas: "C",
        instruktur: "Instruktur C",
        tipeKelas: "Weekday Online",
        jumlahPeserta: 0
    }
];

export default function KelasAdmin() {
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
            <div className="flex items-center justify-start mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/super-admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <PresentationChartBarIcon className="h-5" />
                        <span className="text-base font-semibold">Kelas</span>
                        <span className="text-base font-semibold">40</span>
                    </div>
                </div>
                <button className="bg-green text-white text-xl font-radjdhani_bold border rounded px-3 py-1 flex items-center gap-2" onClick={() => setIsOpen(true)}>
                    Buat Kelas <Plus size={16} />
                </button>
            </div>

            {/* Tabel Pendaftar */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instruktur</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instruktur</th>
                        <th className="px-3 py-3 text-xs  text-center font-medium text-gray-500 uppercase tracking-wider">Jumlah Peserta</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dataKelas.map((kls, idx) => (
                        <tr key={idx}>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{kls.namaKelas}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{kls.instruktur}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{kls.tipeKelas}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700">{kls.jumlahPeserta}</td>
                            <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <Pencil size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                    <CalendarDateRangeIcon className="h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <KelasForm isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
        </div>
    );
}
