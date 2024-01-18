const express=require('express')

const {getAllUsers,addUser}=require('../controllers/userController')
const router=express.Router();

router.route('/getUser').get(getAllUsers)
router.route('/addUser').post(addUser)

module.exports=router;