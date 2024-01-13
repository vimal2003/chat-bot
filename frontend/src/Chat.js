import React,{useEffect,useState} from 'react'

const Chat = ({socket,userName,room}) => {
   const [currentMessage,setCurrentMessage]=useState("");
   const [messageList,setMessageList]=useState([]);

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
        setCurrentMessage("");
    }
   }
   useEffect(() => {
    const message = (data) => {
        setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", message);
    return () => {
        socket.off("receive_message", message);
    };
}, [socket]);

  return (
    <div>
        <div>Live Chat</div>
        <div className={`border border-black w-80 h-96 
    overflow-y-scroll `}>{messageList.map((mes,i)=>{
            return(
                <div key={i} className={mes.author===userName?'bg-red-400 rounded-l-lg w-[60%] mb-3 float-right'
                :'bg-blue-400 rounded-r-lg w-[60%] mb-3 float-left'}>
                    {console.log(mes,userName)}
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