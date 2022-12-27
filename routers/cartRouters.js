const router= require('express').Router()

const {createCartIteam,getCartIteam,updateCartIteam,deleteCartItem}=require('../controllers/cartControllers')

const authorize= require('../middlewares/authorize')

router.route('/')
    .get(authorize,getCartIteam)
    .post(authorize,createCartIteam)
    .put(authorize,updateCartIteam)

router.route('/:id')
    .delete(authorize,deleteCartItem)

module.exports=router;