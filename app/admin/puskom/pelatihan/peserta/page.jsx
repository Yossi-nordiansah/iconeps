"use client";
import { Eye, Mail } from "lucide-react";
import { UsersIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DetailPeserta from "@/app/_component/admin/detailPeserta";
import UbahKelas from "@/app/_component/admin/ubahKelas";
import { Download } from "lucide-react";
import LinkUjianForm from "@/app/_component/admin/uploadLinkUjian";

export default function PesertaAdmin() {

    const router = useRouter();
    const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);
    const pathname = usePathname();
    const [openDetailPeserta, setOpenDetailPeserta] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openChangeClass, setOpenChangeClass] = useState(false);
    const [selectedPeserta, setSelectedPeserta] = useState(null);
    const [detailPeserta, setDetailPesrta] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [dataKelas, setDataKelas] = useState([]);
    const [recipients, setRecipients] = useState([])
    const [peserta, setPeserta] = useState([]);
    const segments = pathname.split('/').filter(Boolean);
    const [emailSegments, setEmailSegments] = useState(null);
    const [openLink, setOpenLink] = useState(false);
    const [openEditLink, setOpenEditLink] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState(null);
    const lastSegmetst = segments[segments.length - 1];
    const [loading, setLoading] = useState(false);

    const getDataPeserta = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/puskom/peserta', { periode: selectedPeriodePuskom });
            setPeserta(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedPeriodePuskom) {
            getDataPeserta();
        }
    }, [selectedPeriodePuskom]);

    useEffect(() => {

    }, [])

    const handleSendEmail = (recipients, segment) => {
        setRecipients(recipients);
        setEmailSegments(segment);
        setIsOpen(true);
    };

    const allEmails = peserta.map(p => p.mahasiswa.email);

    const handleDownloadExcel = async () => {
        try {
            const res = await fetch('/api/puskom/peserta/export');

            if (!res.ok) throw new Error('Gagal mengunduh file');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'peserta_puskom.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Gagal unduh:', error);
            alert('Terjadi kesalahan saat mengunduh file.');
        }
    };

    const onSuccess = () => {
        getDataPeserta()
    };

    return (
        <div className="p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <UsersIcon className="h-5" />
                        <span className="text-base font-semibold">Peserta</span>
                        <span className="text-base font-semibold">{peserta.length}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
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
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => handleSendEmail(allEmails, lastSegmetst)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                    <button
                        onClick={handleDownloadExcel}
                        className={`bg-[#39ac73] text-white font-semibold rounded-sm hover:bg-[#40bf80] px-3 py-2 mx-auto flex items-center justify-center gap-2 transition}`}
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        Memuat data kelas...
                    </div>
                ) :
                    peserta.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 italic border border-gray-200 rounded">
                            Belum ada peserta pada Periode ini
                        </div>
                    ) : <table className="w-full text-left mt-0">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-3 py-2">NIM</th>
                                <th className="px-3 py-2">NAMA</th>
                                <th className="px-3 py-2">FAKULTAS</th>
                                <th className="px-3 py-2">PRODI</th>
                                <th className="px-3 py-2 text-center">SEMESTER</th>
                                <th className="px-3 py-2 text-right">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peserta
                                .filter((mhs) => {
                                    const keyword = searchTerm.toLowerCase();
                                    const nama = mhs.mahasiswa?.nama?.toLowerCase() || "";
                                    const nim = mhs.mahasiswa?.nim?.toLowerCase() || "";
                                    return nama.includes(keyword) || nim.includes(keyword);
                                })
                                .map((mhs, idx) => (
                                    <tr key={idx} className="border-t">
                                        <td className="px-3 py-2">{mhs.mahasiswa?.nim}</td>
                                        <td className="px-3 py-2 max-w-52 min-w-52 truncate overflow-hidden text-ellipsis">{mhs.mahasiswa?.nama || '-'}</td>
                                        <td className="px-3 py-2 max-w-60 min-w-60 truncate overflow-hidden text-ellipsis">{mhs.mahasiswa?.fakultas.substring(9)}</td>
                                        <td className="px-3 py-2">{mhs.mahasiswa?.prodi}</td>
                                        <td className="px-3 py-2 text-center">{mhs.mahasiswa?.semester}</td>
                                        <td className="px-3 py-2 text-right space-x-2">
                                            <button className="p-1 rounded hover:bg-gray-100 text-gray-600"
                                                onClick={() => {
                                                    setOpenDetailPeserta(true);
                                                    setDetailPesrta(mhs);
                                                }}
                                            ><Eye size={16} /></button>
                                            <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => handleSendEmail([mhs.mahasiswa?.email], mhs.mahasiswa?.nama)}><Mail size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                }
            </div>
            <EmailEditor isOpen={isOpen} segment={emailSegments} recipients={recipients} close={() => setIsOpen(false)} />
            <DetailPeserta isOpen={openDetailPeserta} close={() => setOpenDetailPeserta(false)} data={detailPeserta} />
            {/* <UbahKelas isOpen={openChangeClass} segment='puskom' close={() => setOpenChangeClass(false)} onSuccess={onSuccess} selectedPeserta={selectedPeserta} /> */}
            <LinkUjianForm
                isOpen={openLink}
                segment="puskom"
                openEdit={openEditLink}
                data={selectedKelas}
                close={() => setOpenLink(false)}
            />
        </div>
    );
}