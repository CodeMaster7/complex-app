// DEPENDENCIES
const express = require('express')
const router = require('./router'); // 1st executes the file and the code inside it immediately - // 2nd it returns whatever that file exports and stores it to router variable
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const markdown = require('marked')
const sanitizeHTML = require('sanitize-html')

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
    // make our markdown function available form within ejs templates
    res.locals.filterUserHTML = function(content) {
        return sanitizeHTML(markdown(content), {allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'bold', 'i', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], allowedAttributes: {}})
    }

    // make all error and success flash messages available from all templates
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')

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

// Socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// dont memorize this code
io.use(function (socket, next) {
    sessionOptions(socket.request, socket.request.res, next)
})
// dont memorize this code

io.on('connection', function (socket) {
    if (socket.request.session.user) {
        let user = socket.request.session.user

        socket.emit('welcome', {username: user.username, avatar: user.avatar})

        socket.on('chatMessageFromBrowser', function (data) {
            socket.broadcast.emit('chatMessageFromServer', {message: sanitizeHTML(data.message, {allowedTags: [], allowedAttributes: {}}), username: user.username, avatar: user.avatar})
        })
    }
})

// START SERVER
module.exports = server