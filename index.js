const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
var controll = require('./controllers/controllers.js')
app.set('view engine','ejs')
app.use(express.static('./public'))

controll(app)
app.listen(PORT)
