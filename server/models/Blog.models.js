const mongoose = require("mongoose");

const BlogInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: String,
  part: String,
  imgUrl: String,
  description: String,
  redirectLink: String,
  author: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      name: String,
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Blog = mongoose.model("Blog", BlogInfoSchema);
module.exports = Blog;
