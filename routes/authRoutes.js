const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthControlles')


router.post('/sair', AuthController.sair)
router.post('/register', AuthController.registerpost)
router.get('/register', AuthController.register )
router.post('/login', AuthController.loginpost)
router.get('/login', AuthController.login)



module.exports = router;