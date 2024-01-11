import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from 'react'

const socket=io.connect("http://localhost:8000")

function App() {
  const [message,setMessage]=useState("");
  const [display,setDisplay]=useState("");
  const [room,setRoom]=useState("");
  const onSubmit=()=>{
    socket.emit("send_message",{message,room})
    setMessage('')
 
  }
  const joinRoom=()=>{
    if(room!=="")
    socket.emit("join_room",room);
  }
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
    setDisplay(data.message)
   
    })
  },[])
  return (
    <div className="App">
       <input value={room} onChange={(e)=>setRoom(e.target.value)}/>
   <button onClick={joinRoom}>join</button>
   <input value={message} onChange={(e)=>setMessage(e.target.value)}/>
   <button onClick={onSubmit}>send</button>
   <h3>{display}</h3>
    </div>
  );
}

export default App;
