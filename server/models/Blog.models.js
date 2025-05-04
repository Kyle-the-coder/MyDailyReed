const BlogInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTitle: String,
  part: String,
  imgUrl: String,
  content: [
    {
      type: {
        type: String,
        enum: ["Description", "Article", "Image", "Redirect"],
        required: true,
      },
      value: mongoose.Schema.Types.Mixed,
    },
  ],
  author: { type: String, required: true },
  readTime: { type: String, required: true },
  datePosted: { type: Date, default: Date.now, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      name: String,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  categories: { type: [String], default: [] },
});
