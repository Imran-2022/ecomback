const bcrypt = require('bcrypt')
const { User } = require("../models/user")
const _ = require('lodash')
module.exports.resetPasswordRoute = async (req, res) => {
    const { passwordResetCode } = req.params;
    const { new_password } = req.body
    let user = {}
    user = await User.findOne({ passwordResetCode })
    // console.log(user)
    const solt = await bcrypt.genSalt(10)
    const newPasswordHash = await bcrypt.hash(new_password, solt)
    const result = await User.updateOne({ passwordResetCode }, { passwordResetCode:"",password:newPasswordHash })
    
    if(result.modifiedCount>0){
        const token = user.generateJWT();
        console.log(token)

       return res.send(_.pick(user, ['name', 'email', 'isVerified']))
    }
}