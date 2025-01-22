const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
  if (!image) {
    return res.status(400).send("No file uploaded");
  }
  try {
    const results = await cloudinary.uploader.upload(image.path);
    const url = cloudinary.url(results.public_id, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });
    console.log(url);
    return url;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadImage };