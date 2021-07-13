const express = require("express");
const router = express.Router();

const { auth } = require('../controllers/auth');
const { registerUser,loginUser, profile, logout} = require('../controllers/Users')

// adding new user (sign-up route)
router.post('/auth/signup', registerUser);

// login user
router.post('/auth/login', loginUser);

// get logged in user
router.get("/auth/profile", auth, profile);

//logout user
router.get("/auth/logout", auth, logout);

module.exports = router;