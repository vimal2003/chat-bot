import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
export const socket=io.connect("http://localhost:8000")

const MainChat = () => {
  const location = useLocation();
  const {userName} = location.state;
  const navigate = useNavigate();
  const [allChat, setAllChat] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/chat/getalluserchat", { chatName: userName });
        setAllChat(response.data.chat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userName]);

  const newPage=(newUser)=>{
    socket.emit("join_room",newUser);
    navigate('./chat', { state: { userName, room:newUser } })
  }

  return (
    <div className='w-80 h-96 border border-black'>
      <div className='p-3 bg-violet-400'>User Name : {userName}</div>
      {
        allChat && allChat.map((s) => {
          const newUser = s.chatName.replace(new RegExp("-"+userName, 'g'), '').replace(new RegExp(userName+'-', 'g'), '');
          return (
            <div
              key={s._id}
              className='border border-black p-3'
              onClick={() =>newPage(newUser)}
            >
              {newUser}
            </div>
          );
        })
      }
    </div>
  );
};

export default MainChat;
