import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import io from 'socket.io-client'
import { socket} from './MainChat'
const Chat = () => { 
    //const socket=Socket
    // const socket=io.connect("http://localhost:8000")
    const location=useLocation();
    const {userName,room}=location.state;
   const [currentMessage,setCurrentMessage]=useState("");
   const [messageList,setMessageList]=useState([]);
   const [searchText,setSearchText]=useState("");
   const [displaySearch,setDisplaySearch]=useState([]);
   const [display,setDisplay]=useState(false);
   const submit=async()=>{
    if(currentMessage!==''){
       
        const message={
            room:room,
            author:userName,
            message:currentMessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message",message);
        setMessageList((list)=>[...list,message]);
        setDisplay(!display);
        setCurrentMessage("");
       
    }
}
useEffect(()=>{
    const result=async()=>{
        const chatName=[room,userName].sort().join('-').toLowerCase();
        await axios.post("http://localhost:8000/chat/addchat",{chatName,chat:messageList})

    }
    result();
},[messageList,room,userName])

useEffect(()=>{
    const result =async()=>{
        const chatName=[room,userName].sort().join('-').toLowerCase();
   await axios.post("http://localhost:8000/chat/getsinglechat",{chatName}).then((res)=>{
    if(res?.data?.chat?.chat)
    setMessageList(res.data.chat.chat);
   })
    }
    result();
},[room,userName])
   useEffect(() => {
   
    const message = (data) => {
        setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", message);
    console.log(display,messageList)
    return () => {
        socket.off("receive_message", message);
    };
}, [display]); 

useEffect(()=>{
  axios.get("http://localhost:8000/user/getUser").then((data)=>{
   const result=data.data.user;
let filteredResult=[];
if(searchText)
filteredResult=result.filter((a)=>a.name.toLowerCase().includes(searchText.toLowerCase()))
   
  setDisplaySearch(filteredResult);
  })
},[searchText])

  return (
    <div>
        <div><input className='border border-black mt-5' placeholder='search....'
        onChange={(e)=>setSearchText(e.target.value)}/>
        <div className='bg-gray-400 w-44 fixed max-h-14 overflow-y-scroll'>
        {
            displaySearch.map((a)=>{
                return(<div key={a._id}>{a.name}</div>)
            })
        }</div>
        </div>
        <div className={`border border-black w-80 h-96 
    overflow-y-scroll `}>{messageList&&messageList.map((mes,i)=>{
            return(
                <div key={i} className={mes.author===userName?'bg-red-400 rounded-l-lg w-[60%] mb-3 float-right'
                :'bg-blue-400 rounded-r-lg w-[60%] mb-3 float-left'}>
                    {/* {console.log(mes,userName)} */}
                    <p>{mes.message}</p>
                    <div className='flex text-xs'>
                    <p className='pr-3 '>{mes.author}</p>
                    <p>{mes.time}</p>
                    </div>
                </div>
            )
        })}</div>
        <div>
        <input value={currentMessage}  onChange={(e)=>setCurrentMessage(e.target.value)}
        onKeyPress={(e)=>e.key==="Enter"&&submit()} className='border-2 border-black my-5' />
      <button onClick={submit }className='border-2 border-black my-5' >send</button>
        </div>
    </div>
  )
}

export default Chat