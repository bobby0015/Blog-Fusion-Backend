const userModel = require("../models/user_model");
const blogModel = require("../models/blog_model");
const { uploadImage, deleteImageByUrl } = require("./image-cloudinary");

// Create a new blog post for an author
const createBlog = async (req, res) => {
  const { title, content, tags, authorId } = req.body;
  const user = await userModel.findById(authorId);
  const isAuthor = user.role.find((role) => role === "author") ? true : false;
  if (!user || !isAuthor) {
    return res
      .status(404)
      .json({ message: "Author not found", success: false });
  }
  try {
    const image_url = req.file ? await uploadImage(req.file) : null;
    const newBlog = await blogModel.create({
      title,
      content,
      coverImage: image_url,
      tags,
      authorId,
    });
    return res
      .status(201)
      .json({ message: "Blog created successfully", success: true, newBlog });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create blog", success: false });
  }
};

// Get all blog posts for an author
const getAllBlogs = async (req, res) => {
  const authorId = req.body.authorId;
  const user = await userModel.findById(authorId);
  const isAuthor = user.role.find((role) => role === "author") ? true : false;
  if (!user || !isAuthor) {
    return res
      .status(404)
      .json({ message: "Author not found", success: false });
  }
  try {
    const blogs = await blogModel.find({ authorId });
    res.status(200).json({ message: "Blog found", success: true, blogs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get all blogs", success: false });
  }
};

// Delete a blog post for an author
const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    try {
      // Delete the image from Cloudinary
      await deleteImageByUrl(blog.coverImage);
      await blogModel.deleteOne({ _id: blog._id });
      res
        .status(200)
        .json({ message: "Blog deleted successfully", success: true });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to delete blog", success: false });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

// Update a blog post for an author
const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, content, tags, likes } = req.body;
  try {
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    try {
      const imageFn = async () => {
        await deleteImageByUrl(blog.coverImage);
        return await uploadImage(req.file);
      };
      const image_url = req.file ? await imageFn() : "";
      const updatedFields = {
        title: title || blog.title,
        content: content || blog.content,
        tags: tags || blog.tags,
        coverImage: image_url || blog.coverImage,
        likes: (likes && [...blog.likes, likes]) || blog.likes,
      };
      const updatedBlog = await blogModel.updateOne(
        { _id: blog._id },
        { $set: updatedFields }
      );

      res.status(200).json({
        message: "Blog updated successfully",
        success: true,
        updatedBlog,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to update blog", success: false });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { createBlog, getAllBlogs, deleteBlog, updateBlog };
