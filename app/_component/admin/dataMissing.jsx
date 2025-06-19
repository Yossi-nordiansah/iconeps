import React from 'react';
import { Download } from "lucide-react";

const DataMissing = ({ isOpen, close, data }) => {
    if (!isOpen) return null;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50'>
            <div className="bg-white p-5 rounded shadow-md w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-3 text-center">Miss Data NIM</h2>
                <table className='table-auto w-full text-sm text-center border border-gray-300 border-collapse'>
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-2 py-1">NIM</th>
                            <th className="border border-gray-300 px-2 py-1">Nama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((mhs, index) => (
                            <tr className='bg-white' key={index}>
                                <td className="border border-gray-300 px-2 py-1">{mhs.nim}</td>
                                <td className="border border-gray-300 px-2 py-1">{mhs.nama}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex items-center gap-2 mt-3'>
                    <button
                        className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={close}
                    >
                        Tutup
                    </button>
                    <button
                        // onClick={handleDownloadExcel}
                        className='bg-[#39ac73] text-white font-semibold h-fit rounded-sm hover:bg-[#40bf80] px-3 py-2'
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataMissing;
