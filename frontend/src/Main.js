import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App'
import MainChat from './MainChat';
import Chat from './Chat';
const Main = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'element={<App/>}/>
    <Route path='/mainchat' element={<MainChat/>}/>

    <Route path='/mainchat/chat' element={<Chat/>}/>
    
    </Routes>
    </BrowserRouter>
  )
}

export default Main