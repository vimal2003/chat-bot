const express=require('express')

const {addChat,getChat,getsinglechat,getAllUserChat}=require('../controllers/chatContoller')
const router=express.Router();

router.route('/addChat').post(addChat)
router.route('/getChat').get(getChat)
router.route('/getsinglechat').post(getsinglechat)
router.route('/getalluserchat').post(getAllUserChat)

module.exports=router;