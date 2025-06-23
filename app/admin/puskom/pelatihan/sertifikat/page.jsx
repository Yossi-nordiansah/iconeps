"use client";
import { useState, useEffect } from "react";
import { DocumentCheckIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

export default function SertifikatAdmin() {
    const [link, setLink] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const { selectedPeriode } = useSelector((state) => state.kelas);

useEffect(() => {
    setLink("");  // clear dulu agar user lihat perubahan
    setIsEdit(false);

    const fetchLink = async () => {
        if (!selectedPeriode) return;

        try {
            const res = await axios.get(`/api/puskom/peserta/sertifikat?periode=${selectedPeriode}`);
            if (res.data?.link) {
                setLink(res.data.link);
                setIsEdit(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    fetchLink();
}, [selectedPeriode]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!link) {
            Swal.fire("Error", "Link tidak boleh kosong", "error");
            return;
        }

        if (!selectedPeriode) {
            Swal.fire("Error", "Periode belum dipilih", "error");
            return;
        }

        try {
            const res = await axios.post("/api/puskom/peserta/sertifikat", {
                periode: selectedPeriode,
                link,
            });

            if (res.status === 200) {
                Swal.fire("Berhasil", res.data.message, "success");
                setIsEdit(true);
            } else {
                Swal.fire("Gagal", res.data.error || "Terjadi kesalahan", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Gagal", "Tidak dapat terhubung ke server", "error");
        }
    };

    return (
        <div>
            <div className="flex items-center p-6 gap-2">
                <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/admin/puskom/pelatihan/')}>
                    <img src="/icons/back.svg" alt="Back" className="w-6" />
                </button>
                <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                    <DocumentCheckIcon className="h-5" />
                    <span className="text-base font-semibold">Sertifikat</span>
                </div>
            </div>
            <div className="flex items-center justify-center flex-col">
                <img src="/images/gdrive.png" alt="Google Drive" className="-mt-7"/>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <input
                        type="url"
                        className="border border-black px-2 py-1 rounded-md w-full"
                        placeholder="Masukkan link Google Drive.."
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="block w-full mt-4 bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-500 font-roboto"
                    >
                        {isEdit ? "Edit Link Sertifikat" : "Unggah Link Sertifikat"}
                    </button>
                </form>
            </div>
        </div>
    );
}
