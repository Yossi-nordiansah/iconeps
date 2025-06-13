import React from 'react';

const PreviewSertifikat = ({ isOpen, close, data }) => {
    if (!isOpen) return null;

    return (
        <div className='inset-0 bg-black/50 fixed w-full min-h-screen backdrop-blur-sm flex justify-center items-center z-50 px-4'>
            <div className='bg-white p-2 rounded shadow-md max-w-5xl w-full h-[85vh] overflow-hidden'>
                <div className="w-full h-full">
                    <iframe
                        src={data.replace('/public', '')}
                        width="100%"
                        height="100%"
                        className="border rounded w-full h-[90%]"
                        title="Preview Sertifikat"
                        allowFullScreen
                    />
                </div>
                <div className="flex justify-end -mt-10">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={close}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewSertifikat;
