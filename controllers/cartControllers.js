const _ = require('lodash')
const { CartItem } = require('../models/cartItem')

module.exports.createCartIteam = async (req, res) => {
    console.log(req.body);
    let { price, product } = _.pick(req.body, ['price', 'product'])
    const item = await CartItem.findOne({
        user: req.user._id,
        product: product,
    })

    if (item) return res.status(400).send("item already exixts in cart")

    let cartItem = new CartItem({
        price: price, product: product, user: req.user._id
    })
    console.log(cartItem)
   const result= await cartItem.save();
    return res.status(201).send({
        message: "Added to cart successfully 🐸",
        data: result,
    })
}

module.exports.getCartIteam = async (req, res) => {
    const cartIteams = await CartItem.find({
        user: req.user._id
    }).populate('product', 'name')
        .populate('user', 'name')
    return res.status(200).send(cartIteams)
}

module.exports.updateCartIteam = async (req, res) => {
    const { _id, count } = _.pick(req.body, ['count', '_id'])
    userId = req.user._id;
    await CartItem.updateOne({ _id: _id, user: userId }, { count: count })
    return res.status(200).send("iteam Updated !");
}

module.exports.deleteCartItem = async (req, res) => {
    const _id= req.params.id;
    userId= req.user._id;
    await CartItem.deleteOne({_id:_id,user:userId});
    return res.status(200).send("deleted ! 😛")
}
