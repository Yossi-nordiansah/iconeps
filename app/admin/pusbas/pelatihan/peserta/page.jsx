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

export default function PesertaAdmin() {

    const router = useRouter();
    const { selectedPeriode } = useSelector((state) => state.kelas);
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
    const [kelasDipilih, setKelasDipilih] = useState("");
    const segments = pathname.split('/').filter(Boolean);
    const [emailSegments, setEmailSegments] = useState(null);
    const lastSegmetst = segments[segments.length - 1];

    const getDataKelas = async () => {
        try {
            const res = await axios.get(`/api/pusbas/kelas/periode?periode=${selectedPeriode}`);
            setDataKelas(res.data);
        } catch (err) {
            window.alert(`Gagal fetch data: ${err}`);
        }
    };

    const getDataPeserta = async () => {
        try {
            const response = await axios.post('/api/pusbas/peserta', { periode: selectedPeriode });
            console.log(response.data.length)
            setPeserta(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedPeriode) {
            getDataKelas();
            getDataPeserta();
        }
    }, [selectedPeriode]);

    useEffect(() => {

    }, [])

    const pesertaPerKelas = peserta
        .filter((item) => {
            const keyword = searchTerm.toLowerCase();
            const nama = item.mahasiswa?.nama?.toLowerCase() || "";
            const nim = item.mahasiswa?.nim?.toLowerCase() || "";
            return nama.includes(keyword) || nim.includes(keyword);
        })
        .reduce((acc, item) => {
            const namaKelas = item.kelas_peserta_kelasTokelas?.nama_kelas + " (" + item.kelas_peserta_kelasTokelas?.tipe_kelas + ")";

            if (kelasDipilih && namaKelas !== kelasDipilih) return acc;

            if (!acc[namaKelas]) {
                acc[namaKelas] = [];
            }
            acc[namaKelas].push(item);
            return acc;
        }, {});

    const handleSendEmail = (recipients, segment) => {
        setRecipients(recipients);
        setEmailSegments(segment);
        setIsOpen(true);
    };

    const allEmails = peserta.map(p => p.mahasiswa.email);

    useEffect(() => {
        console.log(selectedPeserta)
    }, [selectedPeserta]);

    console.log(`peserta ${peserta.length}`)

    return (
        <div className="p-6 overflow-y-auto">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/pusbas/pelatihan/')}>
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
                    <div className="px-2 py-2 border bg-gray-300 rounded cursor-pointer">
                        <select
                            className="bg-transparent outline-none"
                            value={kelasDipilih}
                            onChange={(e) => setKelasDipilih(e.target.value)}
                        >
                            <option value="">Semua Kelas</option>
                            {dataKelas?.map((kelas) => (
                                <option key={kelas.id} value={`${kelas.nama_kelas} (${kelas.tipe_kelas})`}>
                                    {kelas.nama_kelas + " (" + kelas.tipe_kelas + ")"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => handleSendEmail(allEmails, lastSegmetst)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Tabel Pendaftar */} 
            <div className="max-h-[360px] overflow-y-auto">
                {
                    peserta.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 italic border border-gray-200 rounded">
                            Belum ada peserta.
                        </div>
                    )
                        :
                        (Object.entries(pesertaPerKelas).map(([namaKelas, daftarPeserta]) => (
                            <div key={namaKelas} className="mb-6">
                                <h1 className="text-xl font-bold bg-blue-500 text-white px-2 py-1">{namaKelas}</h1>
                                {
                                    daftarPeserta.length === 0 ? (
                                        <div className="text-center py-4 text-gray-500 italic border border-gray-200 rounded">
                                            Belum ada peserta di kelas ini.
                                        </div>
                                    ) : (<table className="w-full text-left mt-0">
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
                                            {daftarPeserta.map((mhs, idx) => (
                                                <tr key={idx} className="border-t">
                                                    <td className="px-3 py-2">{mhs.mahasiswa?.nim}</td>
                                                    <td className="px-3 py-2 max-w-52 min-w-52 truncate overflow-hidden text-ellipsis">{mhs.mahasiswa?.nama}</td>
                                                    <td className="px-3 py-2 max-w-60 min-w-60 truncate overflow-hidden text-ellipsis">{mhs.mahasiswa?.fakultas.substring(9)}</td>
                                                    <td className="px-3 py-2">{mhs.mahasiswa?.prodi}</td>
                                                    <td className="px-3 py-2 text-center">{mhs.mahasiswa?.semester}</td>
                                                    <td className="px-3 py-2 text-right space-x-2">
                                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600"><img src="/icons/pindahkelas.svg" alt="" className="w-4" onClick={() => {
                                                            setSelectedPeserta(mhs);
                                                            setOpenChangeClass(true);
                                                        }} /></button>
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
                                    </table>)
                                }
                            </div>
                        )))
                }
            </div>
            <EmailEditor isOpen={isOpen} segment={emailSegments} recipients={recipients} close={() => setIsOpen(false)} />
            <DetailPeserta isOpen={openDetailPeserta} close={() => setOpenDetailPeserta(false)} data={detailPeserta} />
            <UbahKelas isOpen={openChangeClass} close={() => setOpenChangeClass(false)} selectedPeserta={selectedPeserta} />
        </div>
    );
}
