"use client";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import axios from "axios";
import KelasForm from '@/app/_component/admin/puskomFormKelas';
import { useRouter, usePathname } from "next/navigation";
import { Trash2, Pencil, Plus } from "lucide-react";
import { PresentationChartBarIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';

export default function KelasAdmin() {

    const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [dataKelas, setDataKelas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = dataKelas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dataKelas.length / itemsPerPage);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedKelas, setSelectedKelas] = useState({})
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 3];

    const getDataKelas = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/puskom/kelas/periode?periode=${selectedPeriodePuskom}`);
            setDataKelas(res.data);
        } catch (err) {
            window.alert(`Gagal fetch data: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedPeriodePuskom) {
            getDataKelas();
        }
    }, [selectedPeriodePuskom]);

    const handleDelete = async (id) => {

        setLoading(true);

        const confirm = await Swal.fire({
            title: "Apa anda yakin menghapus data ini?",
            text: "Data Kelas akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/api/puskom/kelas/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'data berhaasil dihapus',
                    timer: 2000
                });
                getDataKelas();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menghapus Data!',
                    text: error,
                    timer: 2000
                })
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-start mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <PresentationChartBarIcon className="h-5" />
                        <span className="text-base font-semibold">Kelas</span>
                        <span className="text-base font-semibold">{dataKelas.length}</span>
                    </div>
                </div>
                <button className="bg-green text-white text-xl font-radjdhani_bold border rounded px-3 py-1 flex items-center gap-2" onClick={() => setIsOpen(true)}>
                    Buat Kelas <Plus size={16} />
                </button>
            </div>

            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelas</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="py-10 text-center text-gray-500">
                                <div className="flex justify-center items-center gap-2">
                                    <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                    Memuat data kelas...
                                </div>
                            </td>
                        </tr>
                    ) : currentData.length === 0 ? (
                        <tr>
                            <td colSpan={5}>
                                <div className="text-center py-4 text-gray-500 italic border border-gray-200 rounded">
                                    Belum ada Kelas
                                </div>
                            </td>
                        </tr>
                    ) : (
                        currentData.map((kls) => (
                            <tr key={kls.id}>
                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{kls.nama_kelas}</td>
                                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => handleDelete(kls.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                        setOpenEdit(true);
                                        setSelectedKelas(kls);
                                        setIsOpen(true);
                                    }}>
                                        <Pencil size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <KelasForm isOpen={isOpen} segment={lastSegmetst} openEdit={openEdit} selectedKelas={selectedKelas} onSuccess={getDataKelas} close={() => {
                setIsOpen(false);
                setOpenEdit(false);
                setSelectedKelas({});
            }} />
        </div>
    );
}
