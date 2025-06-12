"use client"
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailPesertaLulus from "@/app/_component/admin/detailPesertaLulus";

export default function LulusAdmin() {

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [openDetailPeserta, setOpenDetailPeserta] = useState(false);
    const [detailPeserta, setDetailPeserta] = useState({});
    const [pesertaLulus, setPesertaLulus] = useState([]);
    const [emailSegments, setEmailSegments] = useState(null);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];
    const [recipients, setRecipients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getDataPesertaLulus = async () => {
        try {
            const response = await axios.get('/api/pusbas/peserta/lulus');
            console.log(response.data)
            setPesertaLulus(response.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        getDataPesertaLulus();
    }, []);

    const allEmails = pesertaLulus.map(p => p.mahasiswa.email);

    const filteredPeserta = pesertaLulus.filter((mhs) => {
        const nim = mhs.mahasiswa.nim?.toString().toLowerCase();
        const nama = mhs.mahasiswa.nama?.toLowerCase();
        return nim.includes(searchTerm.toLowerCase()) || nama.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/pusbas/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <CheckBadgeIcon className="h-5" />
                        <span className="text-base font-semibold">Lulus</span>
                        <span className="text-base font-semibold">{pesertaLulus.length}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-black overflow-hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Cari Peserta..."
                            className="outline-none px-3 py-1 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => {
                        setIsOpen(true);
                        setRecipients(allEmails);
                        setEmailSegments(lastSegmetst);
                    }}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <div className="max-h-[360px] overflow-y-auto">
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
                        {filteredPeserta.map((mhs, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.nim}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-56 overflow-hidden truncate text-nowrap text-ellipsis">{mhs.mahasiswa.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-56 overflow-hidden truncate text-nowrap text-ellipsis">{mhs.mahasiswa.fakultas.substring(9)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.prodi}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{mhs.kelas_peserta_kelasTokelas.nama_kelas}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                        setOpenDetailPeserta(true);
                                        setDetailPeserta(mhs);
                                    }}>
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                        setRecipients([mhs.mahasiswa.email]);
                                        setIsOpen(true);
                                        setEmailSegments(mhs.mahasiswa.nama);
                                    }}>
                                        <Mail size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EmailEditor isOpen={isOpen} segment={emailSegments} recipients={recipients} close={() => setIsOpen(false)} />
            <DetailPesertaLulus isOpen={openDetailPeserta} close={() => setOpenDetailPeserta(false)} data={detailPeserta} />
        </div>
    );
}
