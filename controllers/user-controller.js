const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const { firstName, lastName, email, password, profileImageURL, userBio } =
    req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    res
      .status(404)
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
          const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImageURL,
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
    }
  }
};

module.exports = {
  userSignup,
};
