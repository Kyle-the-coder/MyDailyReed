const Blog = require("../models/blog.models");

//Find All
const findAll = async (req, res) => {
  console.log("request made");
  try {
    const results = await Blog.find();
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: "No blogs found", err });
  }
};

//Create
const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (err) {
    res.status(400).json({ message: "Failed to create blog", err });
  }
};

//Find One
const findOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID or request failed", err });
  }
};

//Update
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: "Update failed", err });
  }
};

//Delete
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }

    res.json({ message: "Blog deleted successfully", deletedBlog });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", err });
  }
};

//Add Comment
const addComment = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }

    blog.comments.push({ name, message });

    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Failed to add comment", err });
  }
};

const updateLikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }

    const { action } = req.body;

    if (action === "increment") {
      blog.likes += 1;
    } else if (action === "decrement") {
      blog.likes -= 1;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Failed to update likes", err });
  }
};

// Export all functions at once
module.exports = {
  findAll,
  createBlog,
  findOneBlog,
  updateBlog,
  deleteBlog,
  addComment,
  updateLikes,
};
