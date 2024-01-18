const User=require('../modals/userModal')
const bcrypt = require('bcrypt');

exports.getAllUsers=async(_,res)=>{
    try{
      const user=await User.find();
      res.status(200).json({message:"success",
    user})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message:"server error"})
    }
}


exports.addUser=async(req,res)=>{
    try{
        const{name,password}=req.body;
        const userName=await User.findOne({name});
        if(userName)
        return res.status(402).json({message:"This name already exist"})
        const pass=await bcrypt.hash(password,10);
        const user=await User.create({
    name,password:pass
        })
      return  res.status(200).json({user})
           }
    catch (error) {
    console.log(error);
     return res.status(500).send({ message: "server error" });
 }
}