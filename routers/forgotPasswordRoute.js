const { User } = require("../models/user")
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { sendEmail } = require('../util/sendMail');
const uuid = require('uuid');

module.exports.ForgotPasswordRoute = async (req, res) => {
    const { email } = req.params;
    let user = await User.findOne({ email })
    if (user) {
        const passwordResetCode = uuid.v1()
        const result = await User.updateOne({ email }, { passwordResetCode })
        console.log(result)
        if (result.modifiedCount > 0) {
            const url = `http://localhost:3000/new-password/${passwordResetCode}`
            try {
                await sendEmail({
                    to: 'mdimranulhaque202@gmail.com',
                    from: 'mailgun@sandbox01e46ee67ff14ffdb12ac35159a48927.mailgun.org',
                    subject: 'Please reset your password !',
                    text: "Thanks for signing Up! to verifiy your email ----",
                    html: `<div style="color:red">
                <p>Thanks for signing Up! to verifiy your email ----</p>
                <button style="cursor:pointer"><a href=${url}>Click Here to Verify Email</a></button>
                </div> 
                  `,
                })
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
            return res.send(result)
        }
    }
}