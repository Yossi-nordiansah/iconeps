"use client"
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeriodes } from '../../lib/features/kelasSlice';
import { useEffect } from 'react';

const PusbasPelatihanLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { periodes, loading } = useSelector((state) => state.kelas);

    useEffect(() => {
        dispatch(fetchPeriodes());
    }, [dispatch]);

    return (
        <div className='pl-48 pt-16'>
            <div className='flex p-4 gap-10 items-center'>
                <h1 className='font-radjdhani_bold text-3xl'>Pelatihan</h1>
                <div className='border-2 border-black rounded-lg px-2 py-1 font-robotoBold'>
                    <select name="periode" id="periode" className='outline-none'>
                        {loading ? (
                            <option>Loading ...</option>
                        ) : (
                            [...periodes]
                                .reverse()      
                                .slice(0, 7) 
                                .map((periode, index) => (
                                    <option key={index} value={periode}>
                                        {periode}
                                    </option>
                                ))
                        )}
                    </select>

                </div>
            </div>
            {children ?? <p>Loading...</p>}
        </div>
    );
};

export default PusbasPelatihanLayout;