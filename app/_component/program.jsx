import React from 'react';
import Pusbas from './pusbas';
import Puskom from './puskom';

const Program = () => {
  return (
    <div className='flex flex-col md:gap-16 gap-10 px-4 py-6 sm:py-12' id='program'>
        <Pusbas/>
        <Puskom/>
    </div>
  )
}

export default Program