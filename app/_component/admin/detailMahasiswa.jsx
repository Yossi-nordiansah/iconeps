import React from 'react';

const DetailMahasiswa = ({ isOpen, close, data }) => {
    if (!isOpen) return null;

    const mahasiswa = data?.mahasiswa;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className="bg-white p-5 rounded shadow-md w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-3">Detail Mahasiswa</h2>
                <p><strong>NIM:</strong> {mahasiswa?.nim || "-"}</p>
                <p><strong>Nama:</strong> {mahasiswa?.nama || "-"}</p>
                <p><strong>Fakultas:</strong> {mahasiswa?.fakultas || "-"}</p>
                <p><strong>Prodi:</strong> {mahasiswa?.prodi || "-"}</p>
                <p><strong>Semester:</strong> {mahasiswa?.semester || "-"}</p>
                <p><strong>Telp / WA:</strong> {mahasiswa?.nomor_telepon || "-"}</p>
                <p><strong>Email:</strong> {data?.email || "-"}</p>
                {/* Jangan tampilkan password langsung */}
                <p><strong>Password:</strong> ••••••••</p>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default DetailMahasiswa;
