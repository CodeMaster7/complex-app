const User = require('../models/User')

exports.login = function (req, res) {
    let user = new User(req.body)
    user.login().then(function (result) {
        req.session.user = {favColor: 'blue', username: user.data.username}
        req.session.save(function () {
            res.redirect('/')
        })
    }).catch(function (err) {
        req.flash('errors', err) //req.session.flash.erros = [err]
        req.session.save(function () {
            res.redirect('/')
        })
    })
}

exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/')
    })
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
    if (req.session.user) {
        res.render('home-dashboard', {username: req.session.user.username})
    } else {
        res.render('home-guest', {errors: req.flash('errors')})
    }
}