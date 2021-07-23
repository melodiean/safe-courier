const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

// Setup Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  current_password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.current_password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

// generate token
userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// find by token
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// delete token
userSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
