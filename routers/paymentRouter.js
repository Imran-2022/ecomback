const router = require('express').Router()
const { createPaymentIntent,addPaymentDataToServer,getPaymentData } = require('../controllers/paymentController');

const authorize=require('../middlewares/authorize')

router.route('/create-payment-intent')
    .post(authorize,createPaymentIntent)
    
router.route('/')
    .post(authorize,addPaymentDataToServer)
    .get(authorize,getPaymentData)


module.exports=router;