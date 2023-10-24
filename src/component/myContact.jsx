import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "../asset/Avatar.png";

const MyContact = ({setMessage, setSecondUser, contactData, setContactData, socket}) => {
  

  const user = JSON.parse(localStorage.getItem("user:details"));
  console.log(user.id);

  // Define a state variable to store the contact data

  const getContact = async () => {
    try {
      const response = await axios.get(
        `https://meyouchat-3fe1759de504.herokuapp.com/api/v1/conversation/${user.id}`
      );
      // Assuming the response data is an array, set it in the state
      setContactData(response.data);
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const handleGetMessage=async(contact)=>{
    const userMessage= await axios.get(`https://meyouchat-3fe1759de504.herokuapp.com/api/v1/message/${contact.conversationId}`)
    console.log(userMessage);
    console.log(contact.user)
    setSecondUser(contact.user);
    setMessage({messages: userMessage.data, conversationId: contact.conversationId});
    const m=userMessage.data;
    console.log(m);
  }
  useEffect(() => {
    getContact();
  }, []);

  useEffect(() => {
    // console.log(contactData);
  }, [getContact]);

  return (
    <div className="bg-[#E2EDFD] w-full h-full">
      <div className="flex justify-center
       items-center text-blue-600  font-semibold my-2">Messages</div>
      {
        contactData.length > 0?(contactData.map((contact, i) => (
          <div
            className="flex w-full h-[100px] justify-start items-center border-2 hover:cursor-pointer bg-[#E2EDFD]"
            key={i} onClick={()=>handleGetMessage(contact)}
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
                {contact.user.fullName}
              </div>
              <div className="text-black"></div>
            </div>
          </div>
        ))):<div className="flex justify-center
        items-center text-black  font-semibold my-2">No Conversation</div>
      }
    </div>
  );
};

export default MyContact;
