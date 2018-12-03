const express = require('express')
const app = express()
const port = process.env.Port || 3006

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const listings = require('./listings.json')

app.get('/listings', (req, res) => {
    res.json({ listings })
})
app.post('/', (req, res, next) => {
    let newListing = req.body
    listings.push(newListing)
    res.send(newListing)
})

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found.' })
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ error: err })
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)