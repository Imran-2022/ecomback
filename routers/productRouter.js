const router= require('express').Router()

const {createProduct,getProduct,getProductById,updateProductById,getPhoto,filterProduct}=require('../controllers/productController')

const admin = require('../middlewares/admin')
const authorize=require('../middlewares/authorize')

router.route('/')
    .post([authorize,admin],createProduct)
    .get(getProduct)
router.route('/:id')
    .get(getProductById)
    .put([authorize,admin],updateProductById)
router.route('/photo/:id')
    .get(getPhoto)

router.route('/filter')
    .post(filterProduct)

    
module.exports=router;