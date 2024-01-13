import io from 'socket.io-client'
import { useState} from 'react'
import Chat from './Chat';

const socket=io.connect("http://localhost:8000")

function App() {
  const [userName,setUserName]=useState("");
  const [showChat,setShowChat]=useState(false);
  const [room,setRoom]=useState("");
 
  const joinRoom=()=>{
    if(room!==""&&userName!=="")
    socket.emit("join_room",room);
    setShowChat(true);
  }
  
  return (
    <div className="App">
   {!showChat?(
    <div>
      <div className="text-3xl font-bold ">Join a chat</div>
      <input value={userName} placeholder='enter name' className='border-2 border-black m-5' onChange={(e)=>setUserName(e.target.value)}/>
    <div>  <input value={room} placeholder='enter room id' className='border-2 border-black m-5' onChange={(e)=>setRoom(e.target.value)}/></div>
      <button onClick={joinRoom} className='border-2 border-black m-5 p-1 px-3' >join</button>
    </div>
   ):(<Chat socket={socket} userName={userName} room={room}/>)}
    </div>
  );
}

export default App;
