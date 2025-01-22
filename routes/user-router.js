const express = require("express");
const {
  userSignup,
  userSignin,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/user-controller");
const {
  validateSignupUser,
  validateSigninUser,
} = require("../middlewares/user_atuh_validation");
const { upload, deletePreviousFile } = require("../middlewares/upload_image_multer");

const router = express.Router();

// getting, updating and deleting user
router
  .route("/profile/:id")
  .get(getUserProfile)
  .put(deletePreviousFile, upload.single("file"),updateUserProfile)
  .delete(deleteUserProfile);

// User Signup
router.post("/signup",deletePreviousFile, upload.single("file"), validateSignupUser, userSignup);

// User signin
router.post("/signin", validateSigninUser, userSignin);

module.exports = router;  
