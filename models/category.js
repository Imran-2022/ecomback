const {Schema,model}=require('mongoose')
const Joi= require('joi')

module.exports.Category=model('Catagory',Schema({
    name:{
        type:String,
        unique:true
    }
},{timestamps:true}))
// schema two object- object+typestamps.


module.exports.validate= catagory=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required()
    })
    return schema.validate(catagory)
}