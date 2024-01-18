const Chat=require('../modals/chatModal');

exports.getChat=async(_,res)=>{
  try{
    const chat=await Chat.find();
    res.status(200).json({message:"success",
  chat})
  }
  catch(error){
      console.log(error);
      return res.status(500).send({message:"server error"})
      
  }
}

exports.getAllUserChat=async(req,res)=>{
  try{
    const {chatName}=req.body;
    const chat=await Chat.find({chatName});
    res.status(200).json({message:"success",
  chat})
  }
  catch(error){
      console.log(error);
      return res.status(500).send({message:"server error"})
      
  }
}

exports.getsinglechat=async(req,res)=>{
  try{
    const {chatName}=req.body;
    const chat=await Chat.findOne({chatName});
    //console.log(req,chat,'kk')
    res.status(200).json({message:"success",
  chat})
  }
  catch(error){
    console.log(error);
    return res.status(500).send({message:"server error"})
}
}

exports.addChat = async (req, res) => {
  try {
      const { chatName, chat } = req.body;

      const existingChat = await Chat.findOne({ chatName });

      if (existingChat) {
        if (chat) {
            await Chat.updateOne(
              { _id: existingChat._id },
              { $set: { chat: [...chat] } },
              { bypassDocumentValidation: true }
            );
      
            const updatedChat = await Chat.findById(existingChat._id);
      
            return res.status(200).json({ ch: updatedChat });
          }}else {
          const newChat = await Chat.create({
              chatName,
              chat
          });
          return res.status(200).json({ ch: newChat });
      }
  } catch (error) {
      console.error(error, 'hh');
      return res.status(500).send({ message: "server error" });
  }
}
