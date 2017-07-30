var userController = require('../controller/userController');
var express = require('express');
var router = express.Router();

router.use(userController.loginRequired);

router.get('/tasks', function(req, res){
    res.json({
        user: req.user,
        message: 'Task list successful'
    })
});

module.exports = router;