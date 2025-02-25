"use client"
import React from "react";

const Alur = () => {

    return (
        <div className="px-4 py-6 md:px-10">
            <h1 className="mb-10 text-2xl underline md:text-3xl font-robotoExtraBold text-blue-950">Alur Pelatihan ICONEPS</h1>
            <div className="flex flex-col-reverse items-start justify-between lg:items-center lg:flex-row">
                <div className="lg:w-[50%] ">
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
                            <h1 className="text-xl text-blue-950 font-montserrat_extrabold">Menunggu Waktu Pelatihan</h1>
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
                                <img src="/images/certificate.png" alt="" className="w-6" />
                            </div>
                            <h1 className="text-xl font-montserrat_extrabold text-blue-950">Pelatihan</h1>
                        </div>
                        <ol className="pb-1 pl-12 mt-1 ml-5 space-y-2 text-sm list-decimal list-inside border-l-2 border-gray-400 text-blue-950 font-montserrat_extrabold">
                            <li>Waktu pelatihan akan disesuaikan dengan kelas yang anda ikuti (weekend/weekday)</li>
                            <li>Jika anda lulus, seritifkat bisa didownload melalui website ini</li>
                            <li>Jika tidak lulus, maka anda masih bisa mengikuti remidi</li>
                        </ol>
                    </div> 
                </div>
                <img src="/images/alur6.png" alt="" className="mx-auto lg:w-[50%]"/>
            </div>

        </div>
    )
}

export default Alur