import React from 'react'

const DetailPesertaLulus = ({ isOpen, close, data }) => {

    if (!isOpen) return null;
    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className="bg-white p-5 rounded shadow-md w-fit">
                <h2 className="text-xl font-bold mb-3">Detail Mahasiswa</h2>
                <p><strong>Nama:</strong> {data.mahasiswa?.nama}</p>
                <p><strong>NIM:</strong> {data.mahasiswa?.nim}</p>
                <p><strong>Fakultas:</strong> {data.mahasiswa?.fakultas}</p>
                <p><strong>Email:</strong> {data.mahasiswa?.email}</p>
                <p><strong>WA:</strong> {data.mahasiswa?.nomor_telepon}</p>
                <p><strong>Prodi:</strong> {data.mahasiswa?.prodi}</p>
                <p><strong>Semester:</strong> {data.mahasiswa?.semester}</p>
                <p><strong>Nama Kelas:</strong> {data.kelas_peserta_kelasTokelas?.nama_kelas}</p>
                <p><strong>Tipe Kelas:</strong> {data.kelas_peserta_kelasTokelas?.tipe_kelas}</p>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
    )
}

export default DetailPesertaLulus;