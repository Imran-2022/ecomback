require('express-async-errors')
const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const err= require('./middlewares/error')
const userRouter = require('./routers/userRouter')

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/user',userRouter)


app.get('/', (req, res) => {
    res.send("hellow from dubai 🐸");
})

app.use(err)

module.exports = app;