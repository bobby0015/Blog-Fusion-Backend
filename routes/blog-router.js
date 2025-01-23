const express = require("express");
const { createBlog, getAllBlogs, deleteBlog } = require("../controllers/blog-controller");
const {
  deletePreviousFile,
  upload,
} = require("../middlewares/upload_image_multer");
const checkToken = require("../middlewares/blog_auth_middleware");

const router = express.Router();

router.route("/:id")
.get(checkToken,getAllBlogs)
.delete(deleteBlog)

// creating a new blog post
router.post(
  "/create",
  deletePreviousFile,
  upload.single("coverImage"),
  checkToken,
  createBlog
);

module.exports = router;
