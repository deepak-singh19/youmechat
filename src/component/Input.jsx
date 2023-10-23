import React from 'react'

const Input = ({value, name , type, className, onChange, label, isRequired=true }) => {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
        <label className="text-black w-3/4 ">{label}</label>
        <input value={value} name={name} type={type} required={isRequired} className={`w-3/4 ${className} bg-white text-black border-2 rounded-lg p-2`} onChange={onChange}/>
    </div>
  )
}

export default Input