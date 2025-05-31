"use client";
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { PencilSquareIcon, CheckIcon, DocumentCurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function MahasiswaAdmin() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState([]);
    const [dataPendaftar, setDataPendaftar] = useState([]);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];
    const [statusPendaftar, setStatusPendaftar] = useState(false);
    const [messageEmpty, setmessageErrorEmpty] = useState("");
    const divisi = segments[segments.length - 3];

    const getDataPendaftar = async () => {
        try {
            const response = await axios.post("/api/peserta", {
                divisi: divisi
            });
            setDataPendaftar(response.data)
        } catch (error) {
            setStatusPendaftar(true);
            setmessageErrorEmpty(`Belum ada pendaftar PUSBAS`)
            window.alert(error)
        }
    }

    useEffect(() => {
        getDataPendaftar();
    }, [])

    const toggleSemester = (sem) => {
        setSelectedSemester((prev) =>
            prev.includes(sem)
                ? prev.filter((s) => s !== sem)
                : [...prev, sem]
        );
    };

    return (
        <div className="p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/pusbas/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <PencilSquareIcon className="h-5" />
                        <span className="text-base font-semibold">Pendaftar</span>
                        <span className="text-base font-semibold">40</span>
                    </div>
                    <div className="p-2 w-fit bg-gray-300 rounded cursor-pointer">
                        <CheckIcon className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="rounded-xl border border-black overflow-hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Cari Pendaftar..."
                            className="outline-none px-3 py-1 w-64"
                        />
                        <button className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </button>
                    </div>
                    <div className="px-2 py-2 border bg-gray-300 rounded">
                        <select className="bg-transparent outline-none">
                            <option value="" disabled>Timeline</option>
                            <option value="">Terbaru</option>
                            <option value="">Terlama</option>
                        </select>
                    </div>
                    <button onClick={() => setShowFilter(!showFilter)} className={`${showFilter ? 'bg-red-500' : 'bg-gray-300'} px-4 py-2 rounded`}>
                        {showFilter ? "Tutup Filter" : "Filter"}
                    </button>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => setIsOpen(true)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilter && (
                <div className="bg-gray-100 p-4 rounded shadow mb-4 absolute">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1">Fakultas</label>
                            <select className="w-full border px-3 py-2 rounded">
                                <option value="">Pilih Fakultas</option>
                                <option value="FT">Fakultas Teknik</option>
                                <option value="FE">Fakultas Ekonomi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Prodi</label>
                            <select className="w-full border px-3 py-2 rounded">
                                <option value="">Pilih Prodi</option>
                                <option value="TI">Teknik Informatika</option>
                                <option value="SI">Sistem Informasi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Pilihan Kelas</label>
                            <select className="w-full border px-3 py-2 rounded">
                                <option value="">Pilih Kelas</option>
                                <option value="pagi">Pagi</option>
                                <option value="malam">Malam</option>
                                <option value="weekend">Weekend</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Semester</label>
                            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto border px-2 py-2 rounded">
                                {Array.from({ length: 14 }, (_, i) => i + 1).map((sem) => (
                                    <label key={sem} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedSemester.includes(sem)}
                                            onChange={() => toggleSemester(sem)}
                                            className="accent-blue-600"
                                        />
                                        <span>{sem}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                statusPendaftar ? <div className="w-full">
                    <img src="/images/kosong.png" alt="" className="mx-auto block w-16 mt-32" />
                    <h1 className="text-center mt-2 font-robotoBold">{messageEmpty}</h1>
                </div>
                    :
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakultas</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prodi</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilihan Kelas</th>
                                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dataPendaftar.map((mhs, idx) => (
                                <tr key={idx}>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.nama}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.fakultas}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.prodi}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.semester}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(mhs.peserta[0].tanggal_pendaftaran).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.peserta[0].pilihan_kelas}</td>
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
                                            <CheckIcon className="w-5 h-5" />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                            <DocumentCurrencyDollarIcon className="w-5 h-5" />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                            <Mail size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} />
        </div>
    );
}
