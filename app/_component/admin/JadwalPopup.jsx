// components/JadwalPopup.jsx
"use client";
import React from "react";

export default function JadwalPopup({ isOpen, onClose, jadwal, namaKelas }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {`Jadwal ${namaKelas}`}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <table className="w-full text-sm border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">HARI</th>
              <th className="p-2">TANGGAL</th>
              <th className="p-2">JAM MULAI</th>
              <th className="p-2">JAM SELESAI</th>
              <th className="p-2">AGENDA</th>
            </tr>
          </thead>
          <tbody>
            {jadwal?.map((j, idx) => (
              <tr key={idx} className="text-center border-t">
                <td className="p-2">{j.hari}</td>
                <td className="p-2">{new Date(j.tanggal).toLocaleDateString()}</td>
                <td className="p-2">{j.jam_mulai}</td>
                <td className="p-2">{j.jam_selesai}</td>
                <td className="p-2">{j.agenda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
