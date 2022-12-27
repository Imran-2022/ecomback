const {Schema,model}=require('mongoose')
const Joi= require('joi')

module.exports.Product=model('Product',Schema({
    name:String,
    description:String,
    price:Number,
    category:{
        type:Schema.Types.ObjectId,
        ref:'Catagory',
        // ref means raference. 
        required:true,
    },
    quantity:Number,
    photo:{
        data:Buffer,
        contentType:String,
    }

},{timestamps:true}))
// schema two object- object+typestamps.


module.exports.validatePro= product=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(255).required(),
        description:Joi.string().max(2000).required(),
        price: Joi.number().required(),
        quantity:Joi.number().required(),
        category:Joi.string().required(),

    })
    return schema.validate(product)
}