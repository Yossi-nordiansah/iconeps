import React from 'react'

const DetailPendaftar = ({ isOpen, close, data }) => {

    if (!isOpen) return null;
    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className="bg-white p-5 rounded shadow-md w-fit">
                <h2 className="text-xl font-bold mb-3">Detail Mahasiswa</h2>
                <p><strong>Nama:</strong> {data.nama}</p>
                <p><strong>NIM:</strong> {data.nim}</p>
                <p><strong>Fakultas:</strong> {data.fakultas}</p>
                <p><strong>Prodi:</strong> {data.prodi}</p>
                <p><strong>Semester:</strong> {data.semester}</p>
                <p><strong>Telp / WA:</strong> {data.nomor_telepon}</p>
                <p><strong>Loket Pembayaran:</strong> {data.peserta[0].loket_pembayaran}</p>
                <p><strong>Nominal:</strong> {data.peserta[0].nominal_pembayaran}</p>
                <p><strong>Pilihan Kelas : </strong> {data.peserta[0].pilihan_kelas}</p>
                <p><strong>Tanggal Pembayaran : </strong> {data.peserta[0].tanggal_pembayaran}</p>
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

export default DetailPendaftar