const Chat=require('../modals/chatModal');

exports.getChat=async(_,res)=>{
  try{
    const chat=await Chat.find();
    return res.status(200).json({message:"success",
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
    const chat = await Chat.find({ chatName: { $regex: new RegExp(chatName, 'i') } });
    //console.log('kk',chat[1].chat?.length)
    return res.status(200).json({message:"success",
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
    let chat=await Chat.findOne({chatName});
     //console.log(chat);
    return res.status(200).json({message:"success",
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
var currentDate = new Date();

var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1; 
var currentDay = currentDate.getDate();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentSecond = currentDate.getSeconds();

var formattedDateTime = currentYear + '-' + addLeadingZero(currentMonth) + '-' + addLeadingZero(currentDay) + ' ' +
                        addLeadingZero(currentHour) + ':' + addLeadingZero(currentMinute) + ':' + addLeadingZero(currentSecond);

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

      const existingChat = await Chat.findOne({ chatName });
      if (existingChat) {
        if (chat) {
            await Chat.updateOne(
              { _id: existingChat._id },
              { $set: { chat: [...chat],
                lastSeen:formattedDateTime } },
              
              { bypassDocumentValidation: true }
            );
      
            const updatedChat = await Chat.findById(existingChat._id);
      
            return res.status(200).json({ ch: updatedChat });
          }}else {
          const newChat = await Chat.create({
              chatName,
              chat,
              lastSeen:formattedDateTime
          });
          
          return res.status(200).json({ ch: newChat });
      }
  } catch (error) {
      console.error(error, 'hh');
      return res.status(500).send({ message: "server error" });
  }
}
