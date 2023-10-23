import React, {useState} from 'react';
import Input from '../component/Input';
import Button from '../component/Button';
import { json, useNavigate } from 'react-router-dom';
import axios from "axios";

const Form = ({isSignPage}) => {

    const navigate= useNavigate();
    const [data, setData]=useState({
        ...(!isSignPage && {fullName:""}),
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
        
    }

   
const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    if (!isSignPage) {
        await axios.post(`http://localhost:8000/register/user`, data)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to register user: " + error.response.data);
            });
    } else {
        await axios.post(`http://localhost:8000/login`, data)
            .then((res) => {
                console.log(res);
                if (res.status === 400) {
                    alert("Login failed: " + res.data);
                } else {
                    localStorage.setItem('user:token', res.data.jwtToken);
                    localStorage.setItem('user:details', JSON.stringify(res.data.user));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to login: " + error.response.data);
            });
    }
}


    const handlePageToggle=()=>{
        if(isSignPage){
            navigate('/sign-up');
        }else if(!isSignPage){
            navigate('/sign-in');
        }

    }

    return (
        <div className='bg-[#fff4db] w-full h-full flex justify-center'>
            <div className='bg-white w-1/3 h-3/4 border-2 justify-center m-auto items-center flex flex-col'>
                <div className='text-black text-xl font-bold my-2'>HEY YOU</div>
                <div className='text-black text-lg font-light my-2'>{isSignPage?"Sign In to chat":"Sign Up to get started"}</div>
                <form className='w-full h-auto' onSubmit={(e)=>handleFormSubmit(e)}>
                    {!isSignPage && <Input name="fullName" type="text" className="my-4" value={data.fullName} onChange={handleChange} label="Full Name"/>}
                    <Input name="email" type="email"  className="my-4" value={data.email} onChange={handleChange} label="Email" />
                    <Input name="password" type="password" className="my-4" value={data.password} onChange={handleChange} label="Password"/>
                    <Button type="submit" label={isSignPage?"Sign In":"Singn Up"}/>
                </form>
                
                <div className='flex justify-center items-center text-center text-black'>{isSignPage?"Don't have an account":"Already have a account"} <span className="text-blue-600 underline hover:cursor-pointer" onClick={handlePageToggle}>{isSignPage?"Sign Up":"Sign In"}</span></div>
               

            </div>
        </div>
    )
}

export default Form;



