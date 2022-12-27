const userRouter = require('../routers/userRouter')
const catagoryRouter = require('../routers/catagoryRouter')
const productRouter = require('../routers/productRouter')
const cartRouter = require('../routers/cartRouters')
const profileRoute = require('../routers/profileRouter')


module.exports = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/category', catagoryRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart',cartRouter)
    app.use('/api/profile',profileRoute)

    app.get('/', (req, res) => {
        res.send("hellow from dubai 🐸");
    })
}