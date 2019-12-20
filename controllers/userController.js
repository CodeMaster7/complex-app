const User = require('../models/User')

exports.login = function (req, res) {
    let user = new User(req.body)
    user.login(function (result) {
        res.send(result)
    })
}

exports.logout = function () {

}

exports.register = function (req, res) {
    let user = new User(req.body) // create a new object using User() as its blue-print // always capitalize blue-prints // capital User() helps us distinguish from the user object // the this keyword from the User model is ponting to the new obj since its calling/executing the User() constructor
    user.register()

    if (user.errors.length) {
        res.send(user.errors)
    } else {
        res.send('Congrats, there are no errors.')
    }
}

exports.home = function (req, res) {
    res.render('home-guest')
}