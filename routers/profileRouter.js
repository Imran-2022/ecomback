const router = require('express').Router()

const {getProfile,setProfile}=require ('../controllers/profileController')

const authorize=require('../middlewares/authorize')

router.route('/')
    .post(authorize,setProfile)
    .get(authorize,getProfile)


module.exports=router;