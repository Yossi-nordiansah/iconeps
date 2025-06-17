"use client"
import { Eye, Mail } from "lucide-react";
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailPesertaLulus from "@/app/_component/admin/detailPesertaLulus";
import { useSelector } from "react-redux";
import UbahKelas from "@/app/_component/admin/ubahKelas";

export default function RemidiAdmin() {

    const { selectedPeriode } = useSelector((state) => state.kelas);
    const [openDetailPeserta, setOpenDetailPeserta] = useState(false);
    const [detailPeserta, setDetailPeserta] = useState({});
    const [pesertaRemidial, setPesertaRemidial] = useState([]);
    const [emailSegments, setEmailSegments] = useState(null);
    const [openChangeClass, setOpenChangeClass] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];
    const [recipients, setRecipients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getDataPesertaRemidial = async () => {
        try {
            const res = await axios.get(`/api/puskom/peserta/remidial/periode?periode=${selectedPeriode}`);
            setPesertaRemidial(res.data);
        } catch (err) {
            window.alert(`Gagal fetch data: ${err}`);
        }
    };

    useEffect(() => {
        getDataPesertaRemidial();
    }, [selectedPeriode]);

    const allEmails = pesertaRemidial.map(p => p.mahasiswa.email);

    const filteredPeserta = pesertaRemidial.filter((mhs) => {
        const nim = mhs.mahasiswa.nim?.toString().toLowerCase();
        const nama = mhs.mahasiswa.nama?.toLowerCase();
        return nim.includes(searchTerm.toLowerCase()) || nama.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <ArrowPathIcon className="h-5" />
                        <span className="text-base font-semibold">Remidial</span>
                        <span className="text-base font-semibold">{pesertaRemidial.length}</span>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.fakultas.substring(9)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.prodi}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">{mhs.kelas_peserta_kelasTokelas.nama_kelas}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600"><img src="/icons/pindahkelas.svg" alt="" className="w-4" onClick={() => {
                                    setSelectedPeserta(mhs);
                                    setOpenChangeClass(true);
                                }} /></button>
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
            <EmailEditor isOpen={isOpen} segment={emailSegments} close={() => setIsOpen(false)} recipients={recipients} />
            <DetailPesertaLulus isOpen={openDetailPeserta} close={() => setOpenDetailPeserta(false)} data={detailPeserta} />
            <UbahKelas isOpen={openChangeClass} close={() => setOpenChangeClass(false)} selectedPeserta={selectedPeserta} />
        </div>
    );
}