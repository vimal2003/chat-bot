const express=require("express");
const app=express();
const http=require("http");
const {Server}=require('socket.io');
const cors=require('cors')
const dotenv=require('dotenv')
const path=require('path')
const connectDatabase = require('./config/database');
dotenv.config({path:path.join(__dirname,"config/config.env")})
app.use(express.json())
app.use(cors())
connectDatabase();
const user=require('./routes/user')
const chat=require('./routes/chat')


const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
 
io.on("connection",(socket)=>{
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with ID : ${socket.id} joined room: ${data}`)
    })
    socket.on("send_message",(data)=>{
        socket.to(data.author).emit("receive_message",data);
        console.log(data,'ll');
    })
    socket.on("disconnect",()=>{
        console.log(`User Disconnected`,socket.id)
    })
})

app.use('/user',user)
app.use('/chat',chat)

module.exports=app;

server.listen(process.env.PORT,()=>{
    console.log(`server  running at port ${process.env.PORT}`)
})