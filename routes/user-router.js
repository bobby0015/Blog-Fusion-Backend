const express = require('express');
const { userSignup, userSignin } = require('../controllers/user-controller');
const { validateSignupUser, validateSigninUser } = require('../middlewares/user_atuh_validation');

const router = express.Router();

// User Signup
router.post("/signup",validateSignupUser,userSignup);

// User signin
router.post("/signin",validateSigninUser,userSignin);

module.exports = router;