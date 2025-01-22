const express = require('express');
const { userSignup, userSignin } = require('../controllers/user-controller');

const router = express.Router();

// User Signup
router.post("/signup",userSignup);

// User signin
router.post("/signin",userSignin);

module.exports = router;