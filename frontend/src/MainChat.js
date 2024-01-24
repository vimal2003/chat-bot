import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { Socket } from './Main';
import Chat from './Chat';
const MainChat = () => {
 
  const location = useLocation();
 const socket=Socket
  const {userName} = location.state;
 // const navigate = useNavigate();
  const [allChat, setAllChat] = useState();
  const [searchText,setSearchText]=useState("");
  const [searchBox,setSearchBox]=useState(false);
   const [displaySearch,setDisplaySearch]=useState([]);
   const [newUser,setNewUser]=useState();
   const [page,setPage]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/chat/getalluserchat", { chatName: userName });
        const res=response.data.chat.sort(function(a, b) {
          var dateA = new Date(a.lastSeen);
          var dateB = new Date(b.lastSeen);
          return dateB - dateA;
      })
        setAllChat(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userName,page]);

  

  const newPage=(newUser)=>{
   // Socket.emit("join_room",newUser);
    setNewUser(newUser)
  }

  useEffect(()=>{
    axios.get("http://localhost:8000/user/getUser").then((data)=>{
     const result=data.data.user;
  let filteredResult=[];
  if(searchText)
  filteredResult=result.filter((a)=>a.name.toLowerCase().includes(searchText.toLowerCase()))
     
    setDisplaySearch(filteredResult);
    setSearchBox(true);
    })
  },[searchText])
  const toggle=()=>{
    setPage(!page)
    //console.log(page)
  }
useEffect(() => {
   
    const message = async(data) => {
      // console.log(data,'pppp')
       const response = await axios.post("http://localhost:8000/chat/getalluserchat", { chatName: userName });
        const res=response.data.chat.sort(function(a, b) {
          var dateA = new Date(a.lastSeen);
          var dateB = new Date(b.lastSeen);
          return dateB - dateA;
      })
      //console.log(allChat)
        setAllChat(res);
       // console.log(allChat)
        //setMessageList((list) => [...list, data]);       
    };
    socket.on("new_user", message);
    return () => {
        socket.off("new_user", message);
    };
}); 
 
  return (
    <div className=' h-screen border border-black flex'>
      <div className='w-80 border border-black'>
      <div>
      <input className='border border-black mt-5' placeholder='search....'
      onMouseEnter={()=>setSearchBox(true)}
      onMouseLeave={()=>setSearchBox(false)}
        onChange={(e)=>setSearchText(e.target.value)}/>
        <div className='bg-gray-400 w-[20%] fixed max-h-14 overflow-y-scroll'>
        {
            searchBox&&displaySearch.map((a)=>{
                return(<div  key={a._id} 
                  className='cursor-pointer'
                  onMouseEnter={()=>setSearchBox(true)}
                  onMouseLeave={()=>setSearchBox(false)}>{a.name!==userName&&<div onClick={()=>newPage(a.name)}>{a.name}</div>}</div>)
            })
        }</div>
      </div>
      <div className='p-3 w-80 bg-violet-400'>User Name : {userName}</div>
      {
        allChat && allChat.map((s) => {
          const newUser = s.chatName.replace(new RegExp("-"+userName, 'g'), '').replace(new RegExp(userName+'-', 'g'), '');
         const count=s?.chat?.filter((k)=>!k?.seen&&userName!==k.author)?.length
         //console.log(s)
          return (
            <div
              key={s._id}
              className='border border-black p-3 cursor-pointer '
              onClick={() =>newPage(newUser)}
            >
              {newUser}
             {count>0&&<div className='float-right bg-green-400 p-1 rounded-full'>{count}</div>}
            </div>
          );
        })
      }
      </div>
      <div className='w-full'>
      <Chat userName={userName} room={newUser} toggle={toggle}
      /> 
      </div>
   
    </div>
  );
};

export default MainChat;
