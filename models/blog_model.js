const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model('blogs',blogSchema);
