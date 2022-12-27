require('express-async-errors')

const express = require('express')
const app = express()
const err = require('./middlewares/error')

require('./middlewares')(app)
// by default ata index.js call korbe !

require('./middlewares/routes')(app)

/*

const md= require('./middlewares')
md(app)

it's simplified version is require('./middlewares)(app)
*/

app.use(err)
//  must be after all route . 
// this middleware for specially for error handling . 😛

module.exports = app;