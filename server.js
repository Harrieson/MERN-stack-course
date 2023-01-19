const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500

//routable feature paths to the API
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
    // this method is similar to one above just not explicit.
    // app.use(express.static('public'))

app.use('/', require('./routes/root'))

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))