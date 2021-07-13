const User = require("../models/userModel");

// register user
exports.registerUser = function (req, res) {

 // let { role, email, password } = req.body;
  const newuser = new User({...req.body, role:req.body.role||"user"});
console.log(newuser.role)

  if (newuser.password != newuser.current_password)
    return res.status(400).json({ message: "Password not Match!" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: "Email Exists!" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(200).json({
        success: true,
      });
    });
  });
};

// log user in
exports.loginUser = async (req, res) => {
  let token = req.cookies.auth;

  await User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (user)
      return res.status(400).json({
        message: `${user.username} is logged in!`,
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user)
          return res.json({
            isAuth: false,
            message: "Email not found!",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "Password doesn't match!",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).json({ message: err.message });
            res
              .cookie("auth", user.token, { httpOnly: true })
              .json({
                isAuth: true,
                username: user.username,
                email: user.email,
		role:user.role,
              })
              .status(200);
          });
        });
      });
    }
  });
};

// get user profile
exports.profile = function (req, res) {
  return res.json({
    isAuth: true,
    UID: req.user._id,
    email: req.user.email,
    username: req.user.username,
    role: req.user.role,
  });
};

// log user out
exports.logout = function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).json({ message: err });
    res
      .clearCookie("auth")
      .status(200)
      .json({ message: "Successfully Logged Out!" });
  });
};
