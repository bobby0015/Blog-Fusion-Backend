const { compareSync } = require("bcrypt");

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
    const results = await cloudinary.uploader.upload(image.path, {
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });
    const url = cloudinary.url(results.public_id, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });
    return url;
  } catch (err) {
    console.error(err);
  }
};

const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop(); // Extract file name
  const folderPath = parts.slice(parts.indexOf("blogfusion") + 1).join("/"); // Extract folder path
  return `${folderPath}/${fileName.split(".")[0]}`; // Combine folder and file name (without extension)
};

// Function to delete image using URL
const deleteImageByUrl = async (url) => {
  try {
    const publicId = extractPublicId(url);
    const id  = publicId.split("?")[0];
    const cleanedPublicId = "blogfusion/" + id;
    await cloudinary.uploader.destroy(cleanedPublicId);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImage, deleteImageByUrl };
