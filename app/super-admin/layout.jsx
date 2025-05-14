"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

const AdminLayout = ({ children }) => {
    const pathName = usePathname()
    const router = useRouter()
    const [segment, setSegment] = useState("puskom")

    const handleSegmentChange = (e) => {
        const newSegment = e.target.value
        setSegment(newSegment)
        router.push(`/super-admin/${newSegment}/pelatihan`)
    }

    // Optional: sinkronkan dropdown dengan URL saat reload
    useEffect(() => {
        const matched = pathName.split('/')[2]
        if (matched === 'puskom' || matched === 'pusbas') {
            setSegment(matched)
        }
    }, [pathName])

    return (
        <div>
            <div className='absolute z-20 w-full flex bg-secondary py-2 px-5 justify-between items-center'>
                <div className='flex items-center text-white gap-4'>
                    <img src="/images/iconeps_logo.png" alt="" className='w-11' />
                    <h1 className='text-3xl font-robotoBold'>Halaman Super Admin</h1>
                </div>
                <select className='p-2 rounded' value={segment} onChange={handleSegmentChange}>
                    <option value="puskom">PUSKOM</option>
                    <option value="pusbas">PUSBAS</option>
                </select>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout
