const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;

mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });
