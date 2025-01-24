const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog-controller");
const {
  deletePreviousFile,
  upload,
} = require("../middlewares/upload_image_multer");
const checkToken = require("../middlewares/blog_auth_middleware");

const router = express.Router();

// getting all blog posts, deleting a single blog post by id and updating a blog post
router
  .route("/:id")
  .get(checkToken, getAllBlogs)
  .delete(deleteBlog)
  .put(deletePreviousFile, upload.single("coverImage"), updateBlog);

// creating a new blog post
router.post(
  "/create",
  deletePreviousFile,
  upload.single("coverImage"),
  checkToken,
  createBlog
);

module.exports = router;
