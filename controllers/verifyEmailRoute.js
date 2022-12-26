const { User } = require("../models/user")
const _ = require('lodash')
module.exports.verifyEmailRoute = async (req, res) => {
    const {verificationString}=req.body;
    let user = {}
    user = await User.findOne({ verificationString })
    if(!user) return res.send("error")
    const result = await User.updateOne({ verificationString }, {isVerified: true})
    if(result.modifiedCount>0){
        const token = await user.generateJWT();
        return res.status(201).send({
            message: "verifited successfully !",
            token: token,
            user
        })
    }
    
}