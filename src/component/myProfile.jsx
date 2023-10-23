import React,{useState} from 'react';
import Avatar from "../asset/Avatar.png"

const MyProfile = () => {

  const [user, setUser]= useState(JSON.parse(localStorage.getItem('user:details')));
  return (
    <div className='flex w-full h-[100px] justify-around border-2 bg-[#fff4db]' >
      <div className='w-1/3 flex justify-center items-center'>
      <img src={Avatar} className='rounded-[100%] h-3/4 object-cover bg-white' alt="img"/>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <div className='text-black font-semibold'>{user.fullName}</div>
        <div className='text-black'>My Account</div>

      </div>
      
    </div>
  )
}

export default MyProfile;