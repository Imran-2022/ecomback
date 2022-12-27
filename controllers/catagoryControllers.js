const _ = require('lodash')
const { Category, validate } = require('../models/category')


module.exports.createCatagory=async(req,res)=>{
    const {error}=validate(_.pick(req.body,["name"]))
    if(error) return res.status(400).send(error.details[0].message)
    const catagory=new Category(_.pick(req.body,["name"]))
    const result = await catagory.save();
    return res.status(201).send({
        message:"Category Created Successfully !",
        data:{
            name:result.name
        }
    })
}

module.exports.getCatagories= async(req,res)=>{
    const catagories =await Category.find({}).select({_id:1,name:1}).sort({name:1});
    return res.status(200).send(catagories)
}