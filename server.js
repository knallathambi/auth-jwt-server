// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors        = require('cors');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./app/config/config'); // get our config file
var User   = require('./app/model/user'); // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//mongoose.connect(config.database); // connect to database
var db = require('./app/config/db');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enable CORS
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
// we'll get to these in a second

// var routes = require('./app/routes/appRoute');
// routes(app);

var authRoutes = require('./app/routes/authRoutes');
app.use('/auth', authRoutes);

var taskRoutes = require('./app/routes/taskRoutes');
app.use('/api', taskRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Auth Server - http://localhost:' + port);