var User = require('../model/user');
const crypto = require('crypto');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.register = function(req, res){
  var newUser = new User(req.body);
  newUser.hash_password = crypto.createHash("sha256").update(req.body.password).digest("base64");
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      //user.hash_password = undefined;
      return res.json(user);
    }
  });
}

exports.listUser = function(req, res){
  User.find({}, function(err, users){
    if (err) throw err;
    res.json(users);
  })
}

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      var passwordHash = crypto.createHash("sha256").update(req.body.password).digest("base64");
      if (passwordHash != user.hash_password) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, config.secret)});
      }
    }
  });
}

exports.verify = function(req, res){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
      if (err) {
          res.status(401).json({
            message: 'Invalid token',
            error: err
          });
      } else {
        res.json(decode);
      }
    });
  }  
}

exports.loginRequired = function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

