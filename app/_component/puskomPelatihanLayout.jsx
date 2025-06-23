"use client";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeriodes, setSelectedPeriode } from '../../lib/features/kelasPuskomSlice';
import { useEffect } from 'react';

const PuskomPelatihanLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { periodes, loading, selectedPeriode } = useSelector((state) => state.kelas);

    useEffect(() => {
        dispatch(fetchPeriodes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchPeriodes()).then((res) => {
            const periodes = res.payload;
            if (!selectedPeriode && periodes?.length > 0) {
                dispatch(setSelectedPeriode(periodes[periodes.length - 1]));
            }
        });
    }, []);

    const handleChangePeriode = (e) => {
        const periode = e.target.value;
        dispatch(setSelectedPeriode(periode));
    };

    console.log(periodes);

    return (
        <div className='pl-48 pt-16'>
            <div className='flex p-4 gap-10 items-center'>
                <h1 className='font-radjdhani_bold text-3xl'>Pelatihan</h1>
                <div className='border-2 border-black rounded-lg px-2 py-1 font-robotoBold'>
                    <select name="periode" id="periode" className='outline-none' value={selectedPeriode ?? ''} onChange={handleChangePeriode}>
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

export default PuskomPelatihanLayout;
