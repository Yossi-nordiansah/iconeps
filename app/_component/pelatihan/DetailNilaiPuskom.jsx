import React from 'react';

const DetailNilaiPuskom = ({ isOpen, close, data }) => {
    if (!isOpen) return null;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50 px-4'>
            <div className="bg-white p-5 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-3 text-center">Hasil Ujian</h2>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 sm:text-base text-sm">Listening</th>
                                <th className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 sm:text-base text-sm">Structure</th>
                                <th className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 sm:text-base text-sm">Reading</th>
                                <th className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 sm:text-base text-sm">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 text-center">{data.excel_2016_e.replace("%", "")}</td>
                                <td className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 text-center">{data.powerpoint_2016_e.replace("%", "")}</td>
                                <td className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 text-center">{data.word_2016_e.replace("%", "")}</td>
                                <td className="border border-gray-400 sm:px-4 sm:py-2 py-1 px-1 text-center">{data.total}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h1 className='text-center mt-2'>Batas minimal nilai adalah 56.00</h1>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
                    onClick={close}
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default DetailNilaiPuskom;
