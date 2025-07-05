"use client"
import { Trash2, Pencil, Eye } from "lucide-react";
import { UserGroupIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailMahasiswa from "@/app/_component/admin/detailMahasiswa";
import EditMahasiswa from "@/app/_component/admin/EditMahasiswa";
import Swal from "sweetalert2";

export default function MahasiswaAdmin() {

    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState('');
    const [mahasiswa, setMahasiswa] = useState([])
    const filteredMahasiswa = mahasiswa.filter(m =>
        m.mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.mahasiswa.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [isOpen, setIsOpen] = useState(false);
    const [openDetailMahasiswa, setOpenDetailMahasiswa] = useState(false);
    const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMahasiswa = filteredMahasiswa.slice(indexOfFirstItem, indexOfLastItem);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/mahasiswa");
            setMahasiswa(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleSaveEdit = async (updatedData) => {
        try {
            setMahasiswa(prev =>
                prev.map(m => m.mahasiswa.id === updatedData.id
                    ? {
                        ...m,
                        mahasiswa: { ...m.mahasiswa, nama: updatedData.nama, nim: updatedData.nim },
                        email: updatedData.email,
                        ...(updatedData.password ? { password: updatedData.password } : {})
                    }
                    : m
                )
            );
            const data = await axios.put(`/api/mahasiswa/${updatedData.id}`, updatedData);
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                showConfirmButton: false,
                timer: 2000,
            });
            getData();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal memperbarui data!',
                text: 'Terjadi kesalahan saat menghapus data.',
            });
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Apa anda yakin?',
            text: "Data Mahasiswa akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/api/mahasiswa/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil dihapus!',
                    showConfirmButton: false,
                    timer: 1500
                });
                getData();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menghapus data!',
                    text: 'Terjadi kesalahan saat menghapus data.',
                });
            }
        }
    };

    const allEmails = mahasiswa.map(m => m.email);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <UserGroupIcon className="h-5" />
                        <span className="text-base font-semibold">Mahasiswa</span>
                        <span className="text-base font-semibold">{mahasiswa.length}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-black overflow-hidden flex items-center">
                        <input
                            type="text"
                            placeholder="Cari Mahasiswa..."
                            className="outline-none px-3 py-1 w-64"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <div className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </div>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => setIsOpen(true)}>
                        <img src="/icons/email.svg" alt="Email" className="w-6" />
                        <span>Kirim Email</span>
                    </button>
                </div>
            </div>
            <table className="max-w-11/12 divide-y max-h-20 overflow-auto divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        loading ? (
                            <tr className="w-full">
                                <td colSpan={5} className="py-10 text-center text-gray-500">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                        Memuat data kelas...
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredMahasiswa.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center min-w-[1040px] py-4 text-gray-500">
                                        Hasil tidak ditemukan
                                    </td>
                                </tr>
                            ) : (
                                currentMahasiswa.map((mhs, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{mhs.mahasiswa.nim}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-72 min-w-72 truncate overflow-hidden text-ellipsis">{mhs.mahasiswa.nama}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 max-w-60 min-w-60 truncate overflow-hidden text-ellipsis">{mhs.email}</td>
                                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 max-w-60 truncate overflow-hidden text-ellipsis">{mhs.password}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                                <Trash2 size={16} onClick={() => handleDelete(mhs.id)} />
                                            </button>
                                            <button className="p-1 rounded hover:bg-gray-100 text-gray-600"
                                                onClick={() => {
                                                    setEditData(mhs);
                                                    setOpenEdit(true);
                                                }}>
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => { setOpenDetailMahasiswa(true); setSelectedMahasiswa(mhs); }}>
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                        )
                    }
                </tbody>
            </table>
            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <EmailEditor isOpen={isOpen} segment={lastSegmetst} close={() => setIsOpen(false)} recipients={allEmails} />
            <DetailMahasiswa isOpen={openDetailMahasiswa} close={() => setOpenDetailMahasiswa(false)} data={selectedMahasiswa} />
            <EditMahasiswa isOpen={openEdit} close={() => setOpenEdit(false)} data={editData} onSave={handleSaveEdit} />
        </div>
    );
}