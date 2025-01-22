const express = require('express');
const { userSignup } = require('../controllers/user-controller');

const router = express.Router();

// User Signup
router.post("/signup",userSignup)

module.exports = router;