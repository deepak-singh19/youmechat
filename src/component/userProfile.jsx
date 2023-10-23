import React from 'react';
import Avatar from "../asset/Avatar.png"
import {AiOutlineVideoCameraAdd} from "react-icons/ai";
import {MdAddCall} from "react-icons/md";

const UserProfile = ({seconUser}) => (
    <div className='flex w-full h-[100px] bg-[#E2EDFD] justify-between border-2'>
        <div className='w-1/2 h-full flex'>
            <div className='w-1/3 h-full flex justify-center items-center'>
                <img src={Avatar} className='rounded-[100%] h-3/4 object-cover bg-white' alt="img" />
            </div>
            <div className='flex justify-center items-center flex-col'>
                <div className='text-black font-semibold'>{seconUser?.fullName}</div>
                <div className='text-black'>Status</div>

            </div>
        </div>
        <div className='h-full flex w-[120px]  justify-center items-center'>
            <AiOutlineVideoCameraAdd size={36}  className='mx-4 text-black'/>
            <MdAddCall size={36} className='mx-4 text-black'/>

        </div>

    </div>
)

export default UserProfile;