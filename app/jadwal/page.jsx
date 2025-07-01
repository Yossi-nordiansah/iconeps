"use client";
import React from "react";
import "../globals.css";
import JadwalPusbas from "../_component/jadwalPusbas";
import JadwalPuskom from "../_component/jadwalPuskom";
import { useSelector } from 'react-redux';

const Jadwal = () => {

  const { selectedPeriodePusbas } = useSelector((state) => state.kelas);
  const { selectedPeriodePuskom } = useSelector((state) => state.kelasPuskom);

  return (
    <div className="min-h-screen pt-20 pb-10 lg:px-6 px-2 bg-gray-50">
      <div className="mx-auto">
        <div className="flex gap-4 mb-5 items-center">
          <img src="/images/calendar.png" alt="Calendar Icon" className="w-10" />
          <h1 className="sm:text-2xl text-lg font-robotoBold">Jadwal Pelatihan</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* Pusbas Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-center font-radjdhani_bold mb-1">Jadwal Pusbas</h2>
            <p className="text-center text-sm text-gray-600 mb-3">Periode: {selectedPeriodePusbas}</p>
            <JadwalPusbas />
          </div>

          {/* Puskom Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-1 font-radjdhani_bold">Jadwal Puskom</h2>
            <p className="text-center text-sm text-gray-600 mb-3">Periode: {selectedPeriodePuskom}</p>
            <JadwalPuskom />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Jadwal;

