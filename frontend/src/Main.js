import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App'
import MainChat from './MainChat';
import Chat from './Chat';
import io from 'socket.io-client'
export const Socket=io.connect("http://localhost:8000")



const Main = () => { 
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'element={<App/>}/>
    <Route path='/mainchat' element={<MainChat />}/>

    <Route path='/mainchat/chat' element={<Chat />}/>
    
    </Routes>
    </BrowserRouter>
  )
}

export default Main