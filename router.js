const express = require('express')
const router = express.Router() // we are telling our router what to do like we are telling app what to do
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// profile related routes
router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// post related routes
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)

module.exports = router