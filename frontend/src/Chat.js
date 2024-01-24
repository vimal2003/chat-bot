import React,{useEffect,useState} from 'react'
import axios from 'axios';
//import { useLocation } from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket} from './Main'
const Chat = ({userName,room,toggle}) => { 
    const socket=Socket;
   const [currentMessage,setCurrentMessage]=useState("");
   const [messageList,setMessageList]=useState([]);
   
   const submit=async()=>{
    if(currentMessage!==''&&userName&&room){
       
        const message={
            room:room,
            author:userName,
            message:currentMessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            seen:false
        }
        setMessageList((list)=>[...list,message]);
        
        const updatedMessageList = messageList.map(message => ({
            ...message,
            seen: message.author !== userName ? true:message.seen,
           
          }));
          const chatName=[room,userName].sort().join('-').toLowerCase();
        await axios.post("http://localhost:8000/chat/addchat",{chatName,chat:[...updatedMessageList,message]})
        await socket.emit("send_message",message);
       // console.log(message,'kk');
        toggle();
        setCurrentMessage("");
       
    }
}


useEffect(()=>{
    const result =async()=>{
        const chatName=[room,userName].sort().join('-').toLowerCase();
       // await socket.emit("mainchat",{room,userName});
   await axios.post("http://localhost:8000/chat/getsinglechat",{chatName}).then((res)=>{
    if(res?.data?.chat?.chat){
        const updatedMessageList = res?.data?.chat?.chat.map(message => ({
            ...message,
            seen: message.author !== userName ? true:message.seen,
           
          }));
          //console.log(updatedMessageList)
        //  const ch=[room,userName].sort().join('-').toLowerCase();
        //   axios.post("http://localhost:8000/chat/addchat",{chatName:ch,chat:updatedMessageList})
        //   socket.emit("main_chat",{room});
    setMessageList(updatedMessageList);}
   })

    }
    result();

},[room,userName,socket])
   useEffect(() => {
   
    const message = (data) => {
       
        setMessageList((list) => [...list, data]);
        //console.log(updatedMessageList,messageList)
       
    };
    socket.on("receive_message", message);
    return () => {
        socket.off("receive_message", message);
    };
}, [socket]); 


  return (
    <div className='h-full'>
        
        <div className={`border border-black  h-[90%]
    overflow-y-scroll `}>
                <div className='p-3 h-12 -mt-2 bg-violet-400 fixed w-full z-10 border border-black'>{room}</div>
                <ScrollToBottom className='w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll'>
        {messageList&&messageList.map((mes,i)=>{
            return(
                <div key={i} className={mes.author===userName?'bg-red-400 rounded-l-lg w-[60%] mb-3 float-right'
                :'bg-blue-400 rounded-r-lg w-[60%]  mb-3 float-left'}>
                    <p>{mes.message}</p>
                    <div className='flex text-xs'>
                    <p className='pr-3 '>{mes.author}</p>
                    <p>{mes.time}</p>
                    </div>
                </div>
            )
        })}</ScrollToBottom></div>
        <div className='h-[10%]'>
        <input value={currentMessage}  onChange={(e)=>setCurrentMessage(e.target.value)}
        onKeyPress={(e)=>e.key==="Enter"&&submit()} className='border-2 border-black my-5 w-[90%]' />
      <button onClick={submit }className='border-2 border-black my-5 w-[10%]' >send</button>
        </div>
    </div>
  )
}

export default Chat;