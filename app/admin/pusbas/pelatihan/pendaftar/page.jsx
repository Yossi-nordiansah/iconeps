"use client";
import { Trash2, Pencil, Eye, Mail } from "lucide-react";
import { PencilSquareIcon, CheckIcon, DocumentCurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useRouter, usePathname } from "next/navigation";
import EmailEditor from "@/app/_component/admin/emailEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DetailPendaftar from "@/app/_component/admin/detailPendaftar";
import BuktiPembayaran from "@/app/_component/admin/buktiPembayaran";
import EditPendaftar from "@/app/_component/admin/editPendaftar";

export default function MahasiswaAdmin() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataPendaftar, setDataPendaftar] = useState([]);
    const [allSemesterChecked, setAllSemesterChecked] = useState(true);
    const [selectedFakultas, setSelectedFakultas] = useState('');
    const [selectedProdi, setSelectedProdi] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState();
    const [emailSegments, setEmailSegments] = useState(null);
    const [openDetailPendaftar, setOpenDetailPendaftar] = useState(false);
    const [recipients, setRecipients] = useState("");
    const [detailPendaftar, setDetailPendaftar] = useState([]);
    const [openDetailPembayaran, setOpenDetailPembayaran] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');
    const filteredPendaftar = dataPendaftar
        .filter(m =>
            m.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedFakultas === '' || m.fakultas === selectedFakultas) &&
            (selectedProdi === '' || m.prodi === selectedProdi) &&
            (selectedKelas === '' || m.peserta[0]?.pilihan_kelas === selectedKelas) &&
            (allSemesterChecked || selectedSemester.includes(m.semester))
        )
        .sort((a, b) => {
            const dateA = new Date(a.peserta[0]?.tanggal_pendaftaran);
            const dateB = new Date(b.peserta[0]?.tanggal_pendaftaran);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredPendaftar.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const segments = pathname.split('/').filter(Boolean);
    const lastSegmetst = segments[segments.length - 1];
    const currentPendaftar = filteredPendaftar.slice(indexOfFirstItem, indexOfLastItem);
    const [statusPendaftar, setStatusPendaftar] = useState(false);
    const [messageEmpty, setmessageErrorEmpty] = useState("");
    const divisi = segments[segments.length - 3];

    const getDataPendaftar = async () => {
        try {
            const response = await axios.post("/api/pusbas/peserta", {
                divisi: divisi
            });
            setDataPendaftar(response.data);
            setStatusPendaftar(response.data.length === 0);
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
        setAllSemesterChecked(false);
        setSelectedSemester((prev) =>
            prev.includes(sem)
                ? prev.filter((s) => s !== sem)
                : [...prev, sem]
        );
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFakultas, selectedProdi, selectedSemester, selectedKelas, sortOrder]);

    const handleSaveEdit = async (updatedData) => {
        setDataPendaftar(prev =>
            prev.map(p => p.id === updatedData.id
                ? {
                    ...p,
                    peserta: {
                        ...p.peserta,
                        pilihan_kelas: updatedData.pilihan_kelas,
                        nominal_pembayaran: updatedData.nominal_pembayaran,
                        loket_pembayaran: updatedData.loket_pembayaran
                    },
                }
                : p
            )
        );
        try {
            await axios.put(`/api/pusbas/peserta/${updatedData.id}`, { updatedData, divisi });
            Swal.fire({
                icon: 'success',
                title: 'Data berhasil diperbarui!',
                showConfirmButton: false,
                timer: 2000,
            });
            getDataPendaftar();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal memperbarui data!',
                text: 'Terjadi kesalahan pada Server',
            });
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Apa anda yakin?',
            text: "Data Pendaftar akan dihapus permanen",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });
        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/api/pusbas/peserta/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil dihapus!',
                    showConfirmButton: false,
                    timer: 1500
                });
                getDataPendaftar();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menghapus data!',
                    text: 'Terjadi kesalahan saat menghapus data.',
                    timer: 1500
                });
            }
        }
    };

    const allEmails = dataPendaftar.map(p => p.users.email);

    const handleSendEmail = (recipients, segment) => {
        setRecipients(recipients);
        setEmailSegments(segment);
        setIsOpen(true);
    }

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
                        <span className="text-base font-semibold">{filteredPendaftar.length}</span>
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
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <button className="bg-gray-300 p-2">
                            <img src="/icons/search.svg" alt="Search" className="w-5" />
                        </button>
                    </div>
                    <div className="px-2 py-2 border bg-gray-300 rounded">
                        <select
                            className="bg-transparent outline-none"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="desc">Terbaru</option>
                            <option value="asc">Terlama</option>
                        </select>
                    </div>
                    <button onClick={() => setShowFilter(!showFilter)} className={`${showFilter ? 'bg-red-500' : 'bg-gray-300'} px-4 py-2 rounded`}>
                        {showFilter ? "Tutup Filter" : "Filter"}
                    </button>
                    <button className="flex items-center gap-1 bg-gray-300 p-2 rounded" onClick={() => handleSendEmail(allEmails, lastSegmetst)}>
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
                            <select className="w-full border px-3 py-2 rounded" value={selectedFakultas} onChange={(e) => setSelectedFakultas(e.target.value)}>
                                <option value="">Semua Fakultas</option>
                                <option value="Fakultas Teknik">Fakultas Teknik</option>
                                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                                <option value="Fakultas Ilmu Sosial Dan Ilmu Politik">Fakultas Ilmu Sosial Dan Ilmu Politik</option>
                                <option value="Fakultas Agama Islam">Fakultas Agama Islam</option>
                                <option value="Fakultas Keguruan dan Ilmu Pendidikan">Fakultas Keguruan dan Ilmu Pendidikan</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Prodi</label>
                            <select className="w-full border px-3 py-2 rounded" value={selectedProdi} onChange={(e) => setSelectedProdi(e.target.value)}>
                                <option value="">Semua Prodi</option>
                                <option value="Informatika">Informatika</option>
                                <option value="Teknik Sipil">Teknik Sipil</option>
                                <option value="Teknik Mesin">Teknik Mesin</option>
                                <option value="Teknik Industri">Teknik Industri</option>
                                <option value="Manajemen">Manajemen</option>
                                <option value="Akuntansi">Akuntansi</option>
                                <option value="Ilmu Pemerintahan">Ilmu Pemerintahan</option>
                                <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                                <option value="Pendidikan Agama Islam">Pendidikan Agama Islam</option>
                                <option value="Pendidikan Bahasa Indonesia">Pendidikan Bahasa Indonesia</option>
                                <option value="Pendidikan Bahasa Inggris">Pendidikan Bahasa Inggris</option>
                                <option value="Pendidikan Matematika">Pendidikan Matematika</option>
                                <option value="Pendidikan Kepelatihan Olahraga">Pendidikan Kepelatihan Olahraga</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Pilihan Kelas</label>
                            <select className="w-full border px-3 py-2 rounded" value={selectedKelas} onChange={(e) => setSelectedKelas(e.target.value)}>
                                <option value="">Semua Kelas</option>
                                <option value="weekday_offline">weekday_offline</option>
                                <option value="weekday_online">weekday_online</option>
                                <option value="weekend_offline">weekend_offline</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Semester</label>
                            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto border px-2 py-2 rounded">
                                <label className="flex items-center space-x-2 col-span-4">
                                    <input
                                        type="checkbox"
                                        checked={allSemesterChecked}
                                        onChange={(e) => {
                                            setAllSemesterChecked(e.target.checked);
                                            if (e.target.checked) {
                                                setSelectedSemester([]);
                                            }
                                        }}
                                        className="accent-blue-600"
                                    />
                                    <span>Semua Semester</span>
                                </label>
                                {Array.from({ length: 14 }, (_, i) => i + 1).map((sem) => (
                                    <label key={sem} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedSemester.includes(sem.toString())}
                                            onChange={() => toggleSemester(sem.toString())}
                                            className="accent-blue-600"
                                        />
                                        <span>{sem.toString()}</span>
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
                            {currentPendaftar.map((mhs, idx) => (
                                <tr key={idx}>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-32 overflow-hidden truncate text-nowrap text-ellipsis">{mhs.nama}</td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 max-w-32 overflow-hidden truncate text-nowrap text-ellipsis">{mhs.fakultas.substring(9)}</td>
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
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => handleDelete(mhs.peserta[0].id)}>
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600"
                                            onClick={() => {
                                                setOpenEdit(true);
                                                setEditData(mhs);
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                            setOpenDetailPendaftar(true);
                                            setDetailPendaftar(mhs);
                                        }}>
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
                                            <CheckIcon className="w-5 h-5" />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => {
                                            setOpenDetailPembayaran(true);
                                            setDetailPendaftar(mhs);
                                        }}>
                                            <DocumentCurrencyDollarIcon className="w-5 h-5" />
                                        </button>
                                        <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={()=>handleSendEmail([mhs.users.email], mhs.nama)}>
                                            <Mail size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

            }
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
            <EmailEditor isOpen={isOpen} segment={emailSegments} recipients={recipients} close={() => setIsOpen(false)} />
            <DetailPendaftar isOpen={openDetailPendaftar} close={() => setOpenDetailPendaftar(false)} data={detailPendaftar} />
            <BuktiPembayaran isOpen={openDetailPembayaran} close={() => setOpenDetailPembayaran(false)} data={detailPendaftar} />
            <EditPendaftar isOpen={openEdit} close={() => setOpenEdit(false)} data={editData} onSave={handleSaveEdit} />
        </div>
    );
}
