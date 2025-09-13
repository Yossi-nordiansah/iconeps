import React, { useEffect } from 'react'

const PopupJadwal = ({isOpen, close, data}) => {

    if (!isOpen) return null;

  return (
       <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50 px-4'>
            <div className="bg-white p-5 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-3 text-center">Tanggal Ujian Remidial</h2>
                <p className='text-center'>Jadwal Remidial Akan dilaksanakan Pada</p>
                <h1 className='text-center text-xl font-bold'>{data}</h1>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
  )
}

export default PopupJadwal