var User = require('../models/UserModel');

module.exports = {

  register: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if(err) return res.send(err);
      user.password = null;
      return res.send(user);
    });
  },

  me: function(req, res) {
    if (!req.user) return res.send("current user not defined");
    req.user.password = null;
    return res.json(req.user);
  },

  update: function(req, res, done) {
    User.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
      if (err) done(err);
      res.sendStatus(200);
    });
  }
};
