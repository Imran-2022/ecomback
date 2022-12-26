const bcrypt = require('bcrypt')
const _ = require('lodash')
const { validate, User } = require('../models/user')
const { sendEmail } = require('../util/sendMail');


module.exports.signUp = async (req, res) => {
    const { name, email, password,verificationString } = req.body
    const { error } = validate({ name, email, password })
    if (error) return res.status(400).send(error.details[0].message)

    let user = {}

    user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already Registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isVerified','verificationString']))
    const solt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, solt)
    const token = user.generateJWT();

    const result = await user.save()
    console.log(result)


    const url = `http://localhost:3000/verify-email/${verificationString}`
    try {
        await sendEmail({
            to: 'mdimranulhaque202@gmail.com',
            from: 'mailgun@sandbox01e46ee67ff14ffdb12ac35159a48927.mailgun.org',
            subject: 'Please verify Your Email',
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

    return res.status(201).send({
        message: "registration successfull",
        token: token,
        user: _.pick(result, ['name', 'email'])
    })
}


module.exports.signIIn = async (req, res) => {

    let user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send("Invalid email or password")

    const validUser = await bcrypt.compare(req.body.password, user.password)

    if (!validUser) return res.status(400).send("Invalid email or password")

    const token = user.generateJWT();

    return res.status(200).send({
        message: "login successfull",
        token: token,
        user: _.pick(user, ['name', 'email'])
    })

}