require('dotenv').config();

// DEPENDENCIES
const express = require('express')

const {
    SERVER_PORT
} = process.env;

// connect to mongoDB

// EXPRESS
const app = express()
app.use(express.static('public'))

// 1st argument its an express option so set it to views
// 2nd argument name of the folder
app.set('views', 'views')
// 1st
// 2nd template engine ejs
app.set('view engine', 'ejs')

// ROUTES
app.get('/', function(req, res) {
    res.render('home-guest')
})

app.listen(SERVER_PORT)
console.log(app.settings);