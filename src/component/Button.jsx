import React from 'react'

const Button = ({label, type, className}) => {
  return (
    <div className='w-full flex justify-center items-center'>
        <button type={type} className={`${className} w-3/4 text-black p-2 border-2 hover:cursor-pointer bg-blue-600`}>{label}</button>
    </div>
  )
}

export default Button