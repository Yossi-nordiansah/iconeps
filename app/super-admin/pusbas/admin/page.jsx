"use client"
import { Trash2, Pencil, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminForm from "@/app/_component/admin/formAdmin";
import axios from "axios";
import Swal from "sweetalert2";

export default function InstrukturAdmin() {

    const router = useRouter();
    const pathname = usePathname();
    const [dataAdmin, setDataAdmin] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const segments = pathname.split('/').filter(Boolean);
    const role = `admin_${segments[segments.length - 2]}`;
    const [loading, setLoading] = useState(false);
    const [dataToEdit, setDataToEdit] = useState();

    const getDataAdmin = async () => {

        setLoading(true);

        try {
            const response = await axios.get('/api/pusbas/admin');
            setDataAdmin(response.data);
        } catch (error) {
            window.alert(`Gagal Fetch Data ${error.message}`);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDataAdmin();
    }, []);

    const handleOnDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: 'Data Admin yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/api/admin/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: "Berhasil",
                    text: 'Data Berhasil Dihapus',
                    timer: 2000
                });
                getDataAdmin();
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Erro',
                    text: error.message,
                    timer: 3000
                })
            }
        }
    }

    return (
        <div className="pl-56 pt-24 pr-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <img src="/icons/admin.svg" alt="" className="w-6" />
                        <span className="text-base font-semibold">Admin Pusbas</span>
                        <span className="text-base font-semibold">{dataAdmin?.length ?? 0}</span>
                    </div>
                    <button className="bg-green text-white text-xl font-radjdhani_bold border rounded px-3 py-1 flex items-center gap-2" onClick={() => setIsOpen(true)}>
                        Tambah Admin <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-gray-200">
                    <tr className="min-w-full">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        loading ? (
                            <tr className="min-w-full">
                                <td colSpan={5} className="py-10 text-center text-gray-500">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                        Memuat data kelas...
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            dataAdmin?.map((admin, idx) => (
                                <tr key={idx} className="">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.admin[0].nama}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{admin.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">********</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => handleOnDelete(admin.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                            setDataToEdit(admin)
                                            setIsOpen(true);
                                        }}>
                                            <Pencil size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )
                    }

                </tbody>
            </table>
            <AdminForm isOpen={isOpen} role={role} data={dataToEdit} close={() => {
                setDataToEdit(undefined);
                setIsOpen(false)
                getDataAdmin();
            }} />
        </div>
    );
}
