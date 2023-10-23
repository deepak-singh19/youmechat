import React ,{useEffect, useState} from 'react'
import MyProfile from '../component/myProfile';
import MessageBox from '../component/messageBox';
import MyContact from '../component/myContact';
import axios, { all } from "axios";
import {io} from "socket.io-client";


const Dashboard = () => {

  const currUser= JSON.parse(localStorage.getItem('user:details'))
  const [message, setMessage]= useState([]);
  const [seconUser, setSecondUser]= useState();
  const [contactData, setContactData] = useState([]);
  const [allUser, setAllUser]= useState();
  const [socket, setSocket]= useState(null);

  useEffect(()=>{
    setSocket(io('http://localhost:8080'));
  },[]);

  useEffect(() => {
    socket?.emit('add-user', currUser?.id);
    socket?.on('get-user', (data) => {
      console.log('active users => ', data);
    });

    socket?.on('get-message', ({ conversationId, senderId, message, receiverId,senderUser }) => {
      console.log(message);
      setMessage((prv)=>({
        ...prv,
        messages:[...prv.messages,{user: senderUser, message:{message:message}}]
      }));
    });
    
    
    
  }, [socket]);

  useEffect(()=>{
    console.log(message);

  },[socket, message])

  console.log(message);




  const getAllUser=async()=>{
    console.log(currUser)
    const resData= await axios.get(`http://localhost:8000/api/v1/users/${currUser.id}`);
    setAllUser(resData.data);
  }

  useEffect(()=>{
    getAllUser();
    
  },[]);



  return (
    <div className='w-full h-full flex'>
        <div className='flex flex-col h-full w-1/4 '>
            <MyProfile/>
            <MyContact  setMessage={setMessage} setSecondUser={setSecondUser} contactData={contactData} setContactData={setContactData} socket={socket}/>

        </div>
        <div className='w-full'>
            <MessageBox message={message} setMessage={setMessage} seconUser={seconUser} setSecondUser={setSecondUser} contactData={contactData} allUser={allUser} socket={socket}/>
        </div>
        {/* <div className='w-1/4'>
          <People/>

        </div> */}
        

    </div>
  )
}

export default Dashboard