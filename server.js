require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookiParser = require("cookie-parser");
const { prototype } = require("jsonwebtoken/lib/JsonWebTokenError");
const dotenv = require("dotenv");

// const errorMiddleware = require('./middleware/errors')
//Handle Uncaught exceptions
// process.on('uncaughtException', err => {
//     console.log('ERROR: ${err.stack}');
//     console.log('Shutting down due to uncaught exception');
//     process.exit(1)
// })



const app = express()
app.use(express.json())
app.use(cookiParser())
app.use(cors())
app.use(fileupload({ useTempFiles: true }))

//Routes

// const order = require('./routes/order');

app.use("/user", require("./routes/useRoutes"))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
// app.use('/api', require('./routes/order'))



// // connect to mongodb

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connected to MongoDB");
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

//Handle Unhandled Promiss rejections
// process.on('unhandledRejection', err => {
//     console.log('ERROR: ${err.message}');
//     console.log('Shutting down the server due to unhandled Promise rejection');
//     server.close(() => {
//         process.exit(1)
//     })
// })
