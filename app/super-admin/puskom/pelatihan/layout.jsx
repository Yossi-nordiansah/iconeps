import React from 'react'

const PelatihanLayout = ({children}) => {
    return (
        <div className='pl-48 pt-16'>
            <div className='flex p-4 gap-10 items-center'>
                <h1 className='font-radjdhani_bold text-3xl'>Pelatihan</h1>
                <div className='border-2 border-black rounded-lg px-2 py-1 font-robotoBold'>
                    <select name="" id="" className='outline-none'>
                        <option value="">1 February - 2 Maret 2025</option>
                        <option value="">1 Mei - 2 Juni 2025</option>
                        <option value="">1 Agustus - 2 September 2025</option>
                    </select>
                </div>
            </div>
            {children}
        </div>
    )
}

export default PelatihanLayout