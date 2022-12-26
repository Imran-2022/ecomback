const { User } = require("../models/user")
const _ = require('lodash')
module.exports.verifyEmailRoute = async (req, res) => {
    let user = {}
    user = await User.findOne({ verificationString: req.body.verificationString })
    if(!user) return res.send("error")
    // console.log(user);
    user = new User(_.pick(user, ['name', 'email', 'password', 'isVerified', 'verificationString']))
    const result = await User.updateOne({ verificationString: req.body.verificationString }, { isVerified: true})
    const token = await user.generateJWT();
    if (result) {
        return res.status(201).send({
            message: "verifited successfully !",
            token: token,
            user
        })
    }
    
}