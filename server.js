require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const mongoose = require('mongoose')



const PORT = process.env.PORT || 3000

console.log(process.env.NODE_ENV)
connectDB()


app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/', express.static(path.join(__dirname, '/public')))
    // this method is similar to one above just not explicit.
    // app.use(express.static('public'))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

//This function  catches all routes that don't exist and send a beautiful 404 page.
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})
app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo Database')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})