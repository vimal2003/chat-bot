import { useState} from 'react'
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate=useNavigate();
  const [userName,setUserName]=useState("");
  const [room,setRoom]=useState("");
 
  const joinRoom=()=>{
    if(userName!=="")
  navigate('/mainchat',{state:{userName,room}})
  } 
  
  return (
    <div className="App">
   
    <div>
      <div className="text-3xl font-bold ">Join a chat</div>
      <input value={userName} placeholder='enter name' className='border-2 border-black m-5' onChange={(e)=>setUserName(e.target.value)}/>
    <div>  <input value={room} placeholder='enter room id' className='border-2 border-black m-5' onChange={(e)=>setRoom(e.target.value)}/></div>
      <button onClick={joinRoom} className='border-2 border-black m-5 p-1 px-3' >join</button>
    </div>
   
    </div>
  );
}

export default App;
