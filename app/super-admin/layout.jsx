"use client"
import React, { useState, useEffect } from 'react'
import { usePathname, useRouter, redirect } from 'next/navigation';
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const pathName = usePathname(); 
    const router = useRouter();
    const [segment, setSegment] = useState("puskom");

    useEffect(() => {
        const matched = pathName.split('/')[2];
        if (matched === 'puskom' || matched === 'pusbas') {
            setSegment(matched);
        }
    }, [pathName]);
    
    if (status === "loading") return null;

    if (!session) {
        redirect("/unauthorized");
    }

    if (session?.user?.role !== "super_admin") {
        redirect("/unauthorized");
    }

    const handleSegmentChange = (e) => {
        const newSegment = e.target.value;
        setSegment(newSegment);
        router.push(`/super-admin/${newSegment}/pelatihan`);
    };

    return (
        <div className='h-screen'>
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
    );
}


export default AdminLayout
