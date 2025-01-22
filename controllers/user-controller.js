const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("./image-cloudinary");

// Create a new account
const userSignup = async (req, res) => {
  const { firstName, lastName, email, password, userBio } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    res
      .status(409)
      .json({ message: "User Already Registered", success: false });
    return;
  } else {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashedPassword) => {
          if (err) {
            console.log(err);
            return;
          }

          const image_url = req.file ? await uploadImage(req.file) : null;

          const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImageURL: image_url || null,
            userBio,
          });

          const user_token = jwt.sign(
            { email, id: newUser._id },
            process.env.SECRET_KEY
          );

          if (!user_token) {
            return res
              .status(500)
              .json({ message: "Something went Worng", success: false });
          }
          res.status(201).json({
            message: "User Registration Successful",
            success: true,
            user_token,
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};

// Sign In an existing account
const userSignin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found", success: false });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials. Try again", success: false });
    }
    const user_token = jwt.sign(
      { email, id: user._id },
      process.env.SECRET_KEY
    );
    res
      .status(200)
      .json({ message: "Login successful", success: true, user_token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Unable to find the user", success: false });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }
    res.status(200).json({ message: "User Profile", success: true, user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, userBio } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Unable to find the user", success: false });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }
    
    const image_url = req.file ? await uploadImage(req.file) : null;

    console.log(image_url);

    const updatedFields = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      userBio: userBio || user.userBio,
      profileImageURL: image_url || user.profileImageURL,
    };

    // Update the user in the database
    const updatedUser = await userModel.updateOne(
      { _id: userId },
      { $set: updatedFields }
    );

    res
      .status(200)
      .json({ message: "User Profile Updated", success: true, updatedUser });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const deleteUserProfile = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Unable to find the user", success: false });
  }
  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }
    res.status(200).json({ message: "User Profile Deleted", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  userSignup,
  userSignin,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
