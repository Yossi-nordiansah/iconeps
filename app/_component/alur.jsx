"use client"
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Alur = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div data-aos="fade-up" className="px-4 py-6 md:px-10 bg-white/75">
            <h1 className="mb-10 text-2xl underline md:text-3xl font-robotoExtraBold text-blue-950 ">Alur Pelatihan ICONEPS</h1>
            <div className="flex flex-col-reverse items-start justify-between lg:items-center lg:flex-row">
                <div className="lg:w-[50%]">
                    <div>
                        <div className="flex items-center gap-6">
                            <div className="p-1 bg-blue-500 border-4 rounded-full w-fit border-primary">
                                <img src="/images/registrasi.png" alt="" className="w-6" />
                            </div>
                            <h1 className="text-xl font-montserrat_extrabold text-blue-950">Melakukan Registrasi</h1>
                        </div>
                        <ol className="pb-1 pl-12 mt-1 ml-5 space-y-2 text-sm list-decimal list-inside border-l-2 border-gray-400 text-blue-950 font-montserrat_extrabold">
                            <li>Lakukan registrasi pada website ini</li>
                            <li>isi formulir registrasi</li>
                            <li>submit formulir</li>
                        </ol>
                    </div>
                    <div>
                        <div className="flex items-center gap-6 mt-2">
                            <div className="p-1 bg-blue-500 border-4 rounded-full w-fit border-primary">
                                <img src="/images/daftar.png" alt="" className="w-6" />
                            </div>
                            <h1 className="text-xl font-montserrat_extrabold text-blue-950">Melakukan Pendaftaran Program</h1>
                        </div>
                        <ol className="pb-1 pl-12 mt-1 ml-5 space-y-2 text-sm list-decimal list-inside border-l-2 border-gray-400 text-blue-950 font-montserrat_extrabold">
                            <li>pilih program (pusbas/puskom)</li>
                            <li>lakukan pembayaran</li>
                            <li>simpan bukti pembayaran</li>
                            <li>isi form pendaftaran</li>
                            <li>submit</li>
                        </ol>
                    </div>
                    <div>
                        <div className="flex items-center gap-6 mt-2">
                            <div className="p-1 bg-blue-500 border-4 rounded-full w-fit border-primary">
                                <img src="/images/waiting.png" alt="" className="w-6" />
                            </div>
                            <h1 className="text-xl text-blue-950 font-montserrat_extrabold">Menunggu Waktu Pelatihan Dimulai</h1>
                        </div>
                        <ol className="pb-1 pl-12 mt-1 ml-5 space-y-2 text-sm list-decimal list-inside border-l-2 border-gray-400 text-blue-950 font-montserrat_extrabold">
                            <p>
                                Setelah anda melakukan pendaftaran maka anda akan menunggu jadwal pelatihan dimulai yang disesuaikan dengan periode dari waktu pelatihan.
                            </p>
                        </ol>
                    </div>
                    <div>
                        <div className="flex items-center gap-6 mt-2">
                            <div className="p-1 bg-blue-500 border-4 rounded-full w-fit border-primary">
                                <img src="/images/certificate.png" alt="" className="w-6" />
                            </div>
                            <h1 className="text-xl font-montserrat_extrabold text-blue-950">Masa Pelatihan</h1>
                        </div>
                        <ol className="pb-1 pl-12 mt-1 ml-5 space-y-2 text-sm list-decimal list-inside border-l-2 border-gray-400 text-blue-950 font-montserrat_extrabold">
                            <li>Jadwal pelatihan akan disesuaikan dengan kelas yang anda ikuti</li>
                            <li>Jika anda lulus, seritifkat bisa didownload melalui website ini</li>
                            <li>Jika tidak lulus, maka anda masih bisa mengikuti remidi dengan ketentuan yang berlaku</li>
                        </ol>
                    </div>
                </div>
                <img src="/images/alur6.png" alt="" className="mx-auto lg:w-[50%]" />
            </div>

        </div>
    )
}

export default Alur