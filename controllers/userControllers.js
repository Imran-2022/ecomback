const bcrypt = require('bcrypt')
const _ = require('lodash')
const { validate, User } = require('../models/user')


module.exports.signUp = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = {}

    user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already Registered')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))

    const solt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, solt)

    const token = user.generateJWT();

    const result = await user.save()
    console.log(result)
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