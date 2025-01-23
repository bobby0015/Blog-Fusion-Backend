const express = require("express");
const { createBlog, getAllBlogs } = require("../controllers/blog-controller");
const {
  deletePreviousFile,
  upload,
} = require("../middlewares/upload_image_multer");
const checkToken = require("../middlewares/blog_auth_middleware");

const router = express.Router();

router.route("/:id").get(checkToken,getAllBlogs);

// creating a new blog post
router.post(
  "/create",
  deletePreviousFile,
  upload.single("coverImage"),
  checkToken,
  createBlog
);

module.exports = router;
