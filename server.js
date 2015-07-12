// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config');

// CONTROLLERS //
var UserCtrl = require('./controllers/UserCtrl');

// SERVICES //
var passport = require('./services/passport');


// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  return next();
};


// EXPRESS //
var app = express();

app.use(bodyParser.json());
app.use(session({
  secret: 'gweriwrb-erfawrg45-oasWsd',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/user', UserCtrl.register);
app.get('/user', isAuthed, UserCtrl.me);
app.put('/user', isAuthed, UserCtrl.update);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/user'
}));
app.get('/logout', function(req, res) {
  req.logout();
  return res.send('logged out');
});


// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
});

app.listen(port, function() {
  console.log('Listening on port '+ port);
});
