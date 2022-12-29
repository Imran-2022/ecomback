const userRouter = require('../routers/userRouter')
const catagoryRouter = require('../routers/catagoryRouter')
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouters')
const profileRoute = require('../routers/profileRouter')
const paymentRoute = require('../routers/paymentRouter')

module.exports = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/category', catagoryRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart',cartRouter)
    app.use('/api/profile',profileRoute)
    app.use('/api/payment',paymentRoute)

    app.get('/', (req, res) => {
        res.send("hellow from dubai 🐸");
    })
}