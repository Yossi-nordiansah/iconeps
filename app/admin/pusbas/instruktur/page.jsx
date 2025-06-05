"use client"
import { Trash2, Pencil, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InstrukturForm from "@/app/_component/admin/formInstruktur";
import axios from "axios";
import Swal from "sweetalert2";

export default function InstrukturAdmin() {

    const [instrukturs, setInstrukturs] = useState([]);
    const [selectedInstruktur, setSelectedInstruktur] = useState(null);
    const [openEdit, setOpenEdit] = useState(false)
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 2];

    const getInstruktur = async () => {
        try {
            const response = await axios.get("/api/pusbas/instruktur");
            setInstrukturs(response.data);
        } catch (error) {
            console.log(error);
            window.alert(`Gagal mendapatkan data ${error}`)
        }
    }

    useEffect(() => {
        getInstruktur()
    }, [])

    const handleDelete = async (id) => {

        const confirm = await Swal.fire({
            title: "Apa anda yakin menghapus data ini?",
            text: "Data Instruktur akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal"
        })

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/api/pusbas/instruktur/${id}`);
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil di Hapus!",
                    timer: 1500
                })
                getInstruktur()
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menghapus data!',
                    text: 'Terjadi kesalahan saat menghapus data.',
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className="pl-56 pt-24 pr-6">
            {/* Header dan Pencarian */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                        <img src="/icons/back.svg" alt="Back" className="w-6" />
                    </button>
                    <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                        <img src="/icons/instruktur.svg" alt="" className="w-6" />
                        <span className="text-base font-semibold">Instruktur</span>
                        <span className="text-base font-semibold">3</span>
                    </div>
                    <button className="bg-green text-white text-xl font-radjdhani_bold border rounded px-3 py-1 flex items-center gap-2" onClick={() => setIsOpen(true)}>
                        Tambah Instruktur <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Tabel */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-gray-200">
                    <tr className="min-w-full">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {instrukturs.map((instruktur, idx) => (
                        <tr key={idx} className="">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{instruktur.nama}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{instruktur.kontak}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium space-x-2">
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => handleDelete(instruktur.id)}>
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => { setSelectedInstruktur(instruktur); setOpenEdit(true); setIsOpen(true); }}>
                                    <Pencil size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <InstrukturForm isOpen={isOpen} openEdit={openEdit} segments={lastSegmetst} close={() => { setIsOpen(false); setOpenEdit(false); setSelectedInstruktur(null) }} onSuccess={() => { getInstruktur(); }} selectedInstruktur={selectedInstruktur} />
        </div>
    );
}
