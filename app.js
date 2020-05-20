// DEPENDENCIES
const express = require('express')
const router = require('./router'); // 1st executes the file and the code inside it immediately - // 2nd it returns whatever that file exports and stores it to router variable
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

// Eneble sessions
let sessionOptions = session({
    secret: "javascript is soooooo coooooool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

// EXPRESS
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({extended: false})) // add user submitted data onto our request obj and access it with req.body
app.use(express.json())
app.use(sessionOptions)
app.use(flash())

// MIDDLEWARE (THIS WILL RUN FIRST)
app.use(function (req, res, next) {
    // make current user id available on the req object
    if (req.session.user) {req.visitorId = req.session.user._id} else {req.visitorId = 0}
    // make user session data available from within view templates

    res.locals.user = req.session.user // add any objs or properties onto this locals obj
    next()
})

app.set('views', 'views') // 1st argument its an express option so set it to views - // 2nd argument name of the folder
app.set('view engine', 'ejs') // 1st - // 2nd template engine ejs
// console.log(app.settings);

// ROUTES
app.use('/', router)

// START SERVER
module.exports = app