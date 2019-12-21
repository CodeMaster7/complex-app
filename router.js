const express = require('express')
const router = express.Router() // we are telling our router what to do like we are telling app what to do
const userController = require('./controllers/userController')

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router