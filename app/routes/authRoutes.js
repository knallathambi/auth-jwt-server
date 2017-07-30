var userController = require('../controller/userController');
var express = require('express');
var router = express.Router();

router.post('/register', userController.register);

router.post('/sign_in', userController.sign_in);

router.get('/verify', userController.verify);

module.exports = router;