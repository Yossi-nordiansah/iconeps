"use client"
import { Eye } from "lucide-react";
import { DocumentCheckIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import PreviewSertifikat from "@/app/_component/admin/previewSertifikat";


export default function SertifikatAdmin() {

    const { selectedPeriodePusbas } = useSelector((state) => state.kelas);
    const [sertifikat, setSertifikat] = useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [sertifikatPath, setSertifikatPath] = useState("")
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 3];
    const [loading, setLoading] = useState(false)

    const getDataPesertaLulus = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/pusbas/peserta/lulus/sertifikat?periode=${selectedPeriodePusbas}`);
            setSertifikat(response.data);
        } catch (error) {
            console.log(error);
            window.alert(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getDataPesertaLulus();
    }, [selectedPeriodePusbas])

    return (
        <div className="p-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/pusbas/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <DocumentCheckIcon className="h-5" />
                        <span className="text-base font-semibold">Sertifikat</span>
                        <span className="text-base font-semibold">{sertifikat.length}</span>
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
            <div className="max-h-[360px] overflow-y-auto">
                {
                    loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                            Memuat data kelas...
                        </div>
                    ) :
                        sertifikat.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 italic border border-gray-200 rounded">
                                Belum ada peserta lulus.
                            </div>
                        ) : (
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
                                    {sertifikat.map((mhs, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.sertifikat[0].nomor_sertifikat}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.prodi}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">{format(new Date(mhs.sertifikat[0].tanggal_diterbitkan), 'dd-MM-yyyy')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                                    setOpenPreview(true);
                                                    setSertifikatPath(mhs.sertifikat[0].path);
                                                }}>
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                }
            </div>
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
            <PreviewSertifikat isOpen={openPreview} close={() => setOpenPreview(false)} data={sertifikatPath} />
        </div>
    );
}
