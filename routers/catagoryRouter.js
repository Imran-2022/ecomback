const router= require('express').Router()

const {createCatagory,getCatagories}= require('../controllers/catagoryControllers')

const admin = require('../middlewares/admin')
const authorize=require('../middlewares/authorize')

router.route('/')
    .post([authorize,admin],createCatagory)
    .get(getCatagories)

module.exports=router;