const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
    let token =await req.header('Authorization')
    if (!token) return res.status(401).send("Access Denied ! to token provided")
    else token = token.split(" ")[1].trim();

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) res.status(400).send('Invalid token');
        req.user = decoded;
        //  decoded value will be undefined if not decoded.

        next()

    } catch (err) {
        return res.status(400).send("Invalid token")
    }

}

// try catch overwrite the express-async-error handler.