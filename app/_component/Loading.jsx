import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-[200] px-3">
        <img src="/loading.gif" alt="" className='w-20'/>
    </div>
  )
}

export default Loading