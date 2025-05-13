"use client"
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { DocumentCheckIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState } from "react";

const mahasiswa = [
    {
        noSertifikat: 1201,
        nama: 'Yossi Nordiansah',
        prodi: 'Informatika',
        tanggalDiterbitkan: '01-01-2025'
    },
    {
        noSertifikat: 1202,
        nama: 'Rudi Ardiansyah',
        prodi: 'Manajemen',
        tanggalDiterbitkan: '01-01-2025'
    },
    {
        noSertifikat: 1203,
        nama: 'Imam Fatoni',
        prodi: 'Teknik Mesin',
        tanggalDiterbitkan: '01-01-2025'
    }
];

export default function SertifikatAdmin() {

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
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <DocumentCheckIcon className="h-5" />
                        <span className="text-base font-semibold">Sertifikat</span>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Sertifikat</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Diterbitkan</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mahasiswa.map((mhs, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.noSertifikat}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.prodi}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">{mhs.tanggalDiterbitkan}</td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
        </div>
    );
}
