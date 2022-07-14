const express = require('express')
var morgan = require('morgan')
//HTTP logger
const app = express()
app.use(morgan('combined'))

const bd = require('./config/connectDB')
const route = require('./routes/index')
var bodyParser = require('body-parser')

// for parsing application/json
app.use(express.json())
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//connect bd
bd.connectDB()

//routes
app.use(route)

app.get('/healCheck', (req, res) => {
  res.status(200).json({hello : 'Welcome to Tram Thuy'})
})
app.get('/*', (req, res) => res.send({message: 'cannot access route'}))

const port = 5000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})