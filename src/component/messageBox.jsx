import React, { useState, useEffect, useRef } from "react";
import UserProfile from "./userProfile";
import Input from "./Input";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import Avatar from "../asset/Avatar.png";

const MessageBox = ({ message, seconUser, setMessage,setSecondUser, contactData, allUser, socket }) => {
  const [userMessage, setUserMessage] = useState();
  const mainUser = JSON.parse(localStorage.getItem("user:details"));
  const messageRef= useRef(null);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  

  const handleSendMessage = async () => {
    // console.log(message);
    socket.emit("send-message",{conversationId: message.conversationId, senderId: mainUser.id, message: userMessage, receiverId: seconUser.id});
    await axios
      .post("https://meyouchat-3fe1759de504.herokuapp.com/api/v1/message", {
        conversationId: message.conversationId,
        senderId: mainUser.id,
        message: userMessage,
        receiverId: seconUser.id,
      })
      .then((res) => {
        console.log(res);
      });

    setUserMessage("");
  };

  const handleGetMessage=async(contact,conversationId)=>{
    console.log(contact);
    //senderId=${mainUser.id}&&receiverId=${}
    const userMessage= await axios.get(`https://meyouchat-3fe1759de504.herokuapp.com/api/v1/message/${conversationId}?senderId=${mainUser.id}&&receiverId=${contact.user.id}`)
    console.log(userMessage);
    console.log(contact);
    setSecondUser(contact.user);
    console.log(conversationId)
    setMessage({messages: userMessage.data, conversationId:conversationId});
    const m=userMessage.data;
    console.log(m);
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-3/4 h-screen bg-[#E2EDFD]">
        <div className="w-full">
          <UserProfile seconUser={seconUser} />
        </div>
        <div className="w-full bg-white overflow-scroll">
          <div className="h-screen px-5 py-5 ">
          {message?.messages?.length > 0 ? (
  message.messages.map((m, i) => {
    return (
      <div
        key={i}
        ref={i === message.messages.length - 1 ? messageRef : null}
        className={`max-w-[40%] p-2 mb-2 ${
          mainUser.id === m.user.id
            ? "bg-[#fff4db] rounded-b-xl rounded-tl-xl text-black ml-auto"
            : "bg-[#E2EDFD] rounded-b-xl rounded-tr-xl text-black"
        }
        `}
      >
        {m.message.message}
      </div>
    );
  })
) : (
  <div className="flex justify-center text-black">No Message</div>
)}
This code will ensure that the last message is scrolled into view, whether it's the user's message or the other user's message.






          </div>
        </div>
        <div className="w-full flex h-[250px] border-t-2 justify-between items-center bg-white">
          <div className="w-5/6 ">
            <Input
              name="message"
              value={userMessage}
              type="text"
              onChange={(e) => setUserMessage(e.target.value)}
              className="bg-white rounded-lg"
            />
          </div>
          <div className="w-1/6 flex justify-start items-center">
            <AiOutlineSend
              className="text-black"
              size={24}
              onClick={() => handleSendMessage()}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 h-screen bg-[#E2EDFD]">
        <div className="flex h-[100px] w-full text-black font-semibold justify-center items-center">People</div>
        <div className="w-full h-full overflow-y-scroll">
          {
            allUser?.map((user,i)=>(
              <div
            className="flex w-full h-[80px] justify-start items-center border-2 hover:cursor-pointer bg-[#E2EDFD]"
            key={i} onClick={()=>handleGetMessage(user, "new")}
          >
            <div className="w-1/3 h-full flex justify-center items-center">
              <img
                src={Avatar}
                className="rounded-[100%] h-2/4 object-cover bg-white"
                alt="img"
              />
            </div>
            <div className="flex justify-center items-center flex-col">
              <div className="text-black font-semibold">
                {user.user.fullName}
              </div>
              <div className="text-black"></div>
            </div>
          </div>
            ))
          }

        </div>

      </div>
    </div>
  );
};

export default MessageBox;
