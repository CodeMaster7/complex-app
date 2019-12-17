// DEPENDENCIES
const express = require('express')
const router = require('./router'); // 1st executes the file and the code inside it immediately - // 2nd it returns whatever that file exports and stores it to router variable

// EXPRESS
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: false})) // add user submitted data onto our request obj and access it with req.body
app.use(express.json())

app.set('views', 'views') // 1st argument its an express option so set it to views - // 2nd argument name of the folder
app.set('view engine', 'ejs') // 1st - // 2nd template engine ejs
// console.log(app.settings);

// ROUTES
app.use('/', router)

// START SERVER
module.exports = app