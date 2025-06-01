import React from 'react'

const DetailMahasiswa = ({ isOpen, close, data }) => {

    if (!isOpen) return null;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className="bg-white p-5 rounded shadow-md w-fit">
                <h2 className="text-xl font-bold mb-3">Detail Mahasiswa</h2>
                <p><strong>NIM:</strong> {data.mahasiswa.nim}</p>
                <p><strong>Nama:</strong> {data.mahasiswa.nama}</p>
                <p><strong>Fakultas:</strong> {data.mahasiswa.fakultas}</p>
                <p><strong>Prodi:</strong> {data.mahasiswa.prodi}</p>
                <p><strong>Semester:</strong> {data.mahasiswa.semester}</p>
                <p><strong>Telp / WA:</strong> {data.mahasiswa.nomor_telepon}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Password (encrypted) : </strong> {data.password}</p>
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

export default DetailMahasiswa