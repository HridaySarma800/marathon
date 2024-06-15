const express = require('express')

const userController = require('../Controllers/userController')
const { validate,requestOTP,signup } = userController

const router = express.Router()

router.get('/otp',requestOTP);


router.post('/validate',validate);

module.exports = router
