const mongoose = require("mongoose");

const BlogInfoSchema = new mongoose.Schema({
  title: { type: String },
  subTitle: String,
  part: String,
  imgUrl: String,
  content: [
    {
      type: {
        type: String,
        enum: ["Description", "Article", "Image", "Redirect"],
      },
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  author: { type: String },
  readTime: { type: String },
  datePosted: { type: Date, default: Date.now, required: true },
  likes: { type: [String], default: [] },

  comments: [
    {
      name: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  categories: { type: [String], default: [] },
});

module.exports = mongoose.model("Blog", BlogInfoSchema);
