const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({
    chatName:{
        type:String,
        required:true
    },
    chat:{
       type:Array
    },
    lastSeen:{
       type:String
    }
})

module.exports=mongoose.model('Chat',chatSchema);