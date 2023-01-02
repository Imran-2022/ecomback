require('dotenv/config')
const app =require('./app')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD)
mongoose.connect(DB)
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.error('Mongodb Connection Failed'))

const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`app running on port ${port}`);
})

// -----------------------------------

// require('dotenv/config')
// const app =require('./app')
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true)
// mongoose.connect(process.env.MONGODB_LOCAL_URL)
//     .then(() => console.log("connected to mongodb"))
//     .catch(err => console.error('Mongodb Connection Failed'))

// const port = process.env.PORT || 3001;

// app.listen(port,()=>{
//     console.log(`app running on port ${port}`);
// })