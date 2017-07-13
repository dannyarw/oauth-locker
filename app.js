// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemController = require('./controllers/item');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var ejs = require('ejs');
var session = require('express-session');
var oauth2Controller = require('./controllers/oauth2');
var smsController = require('./controllers/sms');

// Connect to the itemlocker MongoDB
mongoose.connect('mongodb://localhost:27017/locker');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /items
router.route('/items')
    .post(authController.isAuthenticated, itemController.postItems)
    .get(authController.isAuthenticated, itemController.getItems);

// Create endpoint handlers for /items/:item_id
router.route('/items/:item_id')
    .get(authController.isAuthenticated, itemController.getItem)
    .put(authController.isAuthenticated, itemController.putItem)
    .delete(authController.isAuthenticated, itemController.deleteItem);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(oauth2Controller.authorization)
    .post(oauth2Controller.decision);

// Request an OTP code
router.route('/oauth2/sms')
    .get(smsController.getOTP)
    .post(smsController.validateOTP);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000, function() {
    console.log('Locker app listening on port 3000!')
})
