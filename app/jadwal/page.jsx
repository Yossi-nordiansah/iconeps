// 
"use client";
import React from "react";
import "../globals.css";

const Jadwal = () => {
  const pusbas = {
    periode: "23 Januari - 3 Februari 2025",
    classes: [
      {
        nama: "Kelas A",
        tipe: "Weekend Online",
        warna: "bg-yellow-400",
        jadwal: [
          { hari: "Kamis", tanggal: "23 Januari 2025", jamMulai: "13.00", jamSelesai: "16.00", agenda: "Pembukaan & Orientasi" },
          { hari: "Sabtu", tanggal: "25 Januari 2025", jamMulai: "09.00", jamSelesai: "12.00", agenda: "Pelatihan Materi 1" },
          { hari: "Minggu", tanggal: "26 Januari 2025", jamMulai: "09.00", jamSelesai: "12.00", agenda: "Pelatihan Materi 2" },
          { hari: "Sabtu", tanggal: "01 Februari 2025", jamMulai: "09.00", jamSelesai: "12.00", agenda: "Review & Latihan Soal" },
          { hari: "Minggu", tanggal: "02 Februari 2025", jamMulai: "09.00", jamSelesai: "12.00", agenda: "Ujian Teori" },
        ],
      },
      {
        nama: "Kelas B",
        tipe: "Weekend Online",
        warna: "bg-yellow-300",
        jadwal: [
          { hari: "Kamis", tanggal: "23 Januari 2025", jamMulai: "13.00", jamSelesai: "16.00", agenda: "Pembukaan & Orientasi" },
          { hari: "Sabtu", tanggal: "25 Januari 2025", jamMulai: "13.00", jamSelesai: "16.00", agenda: "Pelatihan Materi A" },
          { hari: "Minggu", tanggal: "26 Januari 2025", jamMulai: "13.00", jamSelesai: "16.00", agenda: "Pelatihan Materi B" },
          { hari: "Sabtu", tanggal: "01 Februari 2025", jamMulai: "13.00", jamSelesai: "16.00", agenda: "Praktik Lapangan" },
          { hari: "Senin", tanggal: "03 Februari 2025", jamMulai: "13.00", jamSelesai: "15.00", agenda: "Ujian Akhir" },
        ],
      },
    ],
  };

  const puskom = {
    periode: "Maret - April 2025",
    classes: [
      {
        nama: "Kelas A",
        warna: "bg-green-400",
        jadwal: [
          { hari: "Senin", tanggal: "03 Maret 2025", jamMulai: "08.00", jamSelesai: "11.00", },
          { hari: "Selasa", tanggal: "04 Maret 2025", jamMulai: "08.00", jamSelesai: "11.00", },
          { hari: "Rabu", tanggal: "05 Maret 2025", jamMulai: "08.00", jamSelesai: "11.00", },
          { hari: "Kamis", tanggal: "06 Maret 2025", jamMulai: "08.00", jamSelesai: "11.00", },
          { hari: "Jumat", tanggal: "07 Maret 2025", jamMulai: "08.00", jamSelesai: "10.00", },
        ],
      },
      {
        nama: "Kelas B",
        warna: "bg-green-300",
        jadwal: [
          { hari: "Sabtu", tanggal: "08 Maret 2025", jamMulai: "09.00", jamSelesai: "12.00" },
          { hari: "Minggu", tanggal: "09 Maret 2025", jamMulai: "09.00", jamSelesai: "12.00" },
          { hari: "Sabtu", tanggal: "15 Maret 2025", jamMulai: "09.00", jamSelesai: "12.00" },
          { hari: "Minggu", tanggal: "16 Maret 2025", jamMulai: "09.00", jamSelesai: "12.00" },
        ],
      },
    ],
  };


  const renderKelasCard = (kelas, showAgenda = true) => (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 w-full">
      <h2 className="text-xl font-robotoBold text-center mb-1">{kelas.nama}</h2>
      {kelas.tipe && <p className="text-center text-gray-600 text-sm mb-3">{kelas.tipe}</p>}
      <table className="table-auto w-full text-sm text-center border border-gray-200">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th>Hari</th>
            <th>Tanggal</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            {showAgenda && <th>Agenda</th>}
          </tr>
        </thead>
        <tbody>
          {kelas.jadwal.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-100">
              <td>{item.hari}</td>
              <td>{item.tanggal}</td>
              <td>{item.jamMulai}</td>
              <td>{item.jamSelesai}</td>
              {showAgenda && <td>{item.agenda || "-"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  return (
    <div className="min-h-screen py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-10 items-center">
          <img src="/images/calendar.png" alt="Calendar Icon" className="w-10" />
          <h1 className="sm:text-2xl text-lg font-robotoBold">Jadwal Pelatihan</h1>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          {/* Pusbas Section */}
          <div>
            <h2 className="text-3xl font-bold text-center font-radjdhani_bold mb-1">Jadwal Pusbas</h2>
            <p className="text-center text-sm text-gray-600 mb-6">Periode: {pusbas.periode}</p>
            <div className="flex flex-col gap-6">
              {pusbas.classes.map((kelas, index) => (
                <div key={index}>{renderKelasCard(kelas, true)}</div>
              ))}
            </div>
          </div>

          {/* Puskom Section */}
          <div>
            <h2 className="text-3xl font-bold text-center text-green-700 mb-1 font-radjdhani_bold">Jadwal Puskom</h2>
            <p className="text-center text-sm text-gray-600 mb-6">Periode: {puskom.periode}</p>
            <div className="flex flex-col gap-6">
              {puskom.classes.map((kelas, index) => (
                <div key={index}>{renderKelasCard(kelas, false)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;


