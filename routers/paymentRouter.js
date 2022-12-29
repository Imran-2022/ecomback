const router = require('express').Router()
const { createPaymentIntent } = require('../controllers/paymentController');

const authorize=require('../middlewares/authorize')

router.route('/create-payment-intent')
    .post(authorize,createPaymentIntent)
    
// router.route('/')
//     .post(authorize,setProfile)
//     .get(authorize,getProfile)


module.exports=router;