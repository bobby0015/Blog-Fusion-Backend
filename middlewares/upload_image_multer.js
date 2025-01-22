const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { firstName, lastName } = req.body;
    const sanitizedFirstName = firstName
      ? firstName.replace(/\s+/g, "_")
      : "unknown";
    const sanitizedLastName = lastName
      ? lastName.replace(/\s+/g, "_")
      : "unknown";

    // Create the filename
    const filename = `${sanitizedFirstName}-${sanitizedLastName}-${Date.now()}.${
      file.mimetype.split("/")[1]
    }`;

    cb(null, filename);
  },
});

const upload = multer({ storage });

const clearDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    console.log("Directory does not exist.");
    return;
  }

  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      // Recursively remove subdirectory
      clearDirectory(filePath);
      fs.rmdirSync(filePath);
    } else {
      // Remove file
      fs.unlinkSync(filePath);
    }
  });

  console.log(`Cleared directory: ${directoryPath}`);
};

// Example usage
const directoryPath = "uploads/";

const deletePreviousFile = (req, res, next) => {
  try {
    clearDirectory(directoryPath);
    next();
  } catch (err) {
    console.log("Something went wrong");
    next();
  }
};

module.exports = { upload, deletePreviousFile };
