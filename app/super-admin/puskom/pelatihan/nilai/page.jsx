"use client"
import React, { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function NilaiAdmin() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const router = useRouter();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Silakan pilih file terlebih dahulu.");
            return;
        }
        console.log("Uploading file:", file);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <button className="bg-gray-300 p-2 rounded" onClick={() => router.push('/super-admin/puskom/pelatihan/')}>
                    <img src="/icons/back.svg" alt="Back" className="w-6" />
                </button>
                <div className="flex items-center gap-2 bg-gray-300 px-2 py-2 rounded">
                    <AcademicCapIcon className="h-5" />
                    <span className="text-base font-semibold">Input Nilai</span>
                </div>
            </div>
            
            <div
                className={`w-full mx-auto mt-10 max-w-md bg-gray-300 p-8 rounded-lg text-center transition ${dragActive ? "ring-2 ring-black" : ""
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <h2 className="text-xl font-bold mb-4">Upload File Excel</h2>
                <div className="flex flex-col items-center gap-2">
                    <img src="/icons/excel.svg" alt="Excel Icon" className="w-16 h-16" />
                    <label className="flex items-center gap-2 cursor-pointer mt-4">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <span className="border px-4 py-2 rounded bg-white">Choose File</span>
                        <span>{file ? file.name : "No File Chosen"}</span>
                    </label>
                    <button
                        className="mt-4 bg-black text-white px-6 py-2 rounded"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
