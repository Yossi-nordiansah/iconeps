import React from 'react';

const BuktiPembayaran = ({ isOpen, close, data }) => {

    if (!isOpen) return null;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white p-5 rounded shadow-md w-fit overflow-y-auto'>
                <div className="overflow-hidden rounded shadow max-h-96 overflow-y-auto">
                    <img
                        src={data.peserta[0].bukti_pembayaran}
                        alt="Preview"
                        className="max-w-80 transition-transform duration-300 ease-in-out hover:scale-150"
                    />
                </div>
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

export default BuktiPembayaran