const {Schema,model}=require('mongoose')

const CartItemSchema= Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    price:Number,
    count:{
        type:Number,
        default:1,
        min:1,
        max:5,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    category:String,

},{timeStamps:true})


module.exports.CartItemSchema=CartItemSchema;
//  will need in order model that's why export schema

module.exports.CartItem=model('CartItem',CartItemSchema)
