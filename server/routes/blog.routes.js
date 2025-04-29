const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blog.controllers");

// GET all blogs
router.get("/", BlogController.findAll);

// POST create a new blog
router.post("/", BlogController.createBlog);

// GET one blog by ID
router.get("/:id", BlogController.findOneBlog);

// PUT update a blog by ID
router.put("/:id", BlogController.updateBlog);

// DELETE a blog by ID
router.delete("/:id", BlogController.deleteBlog);

// Route to add a comment to a specific blog post
router.post("/:id/comments", BlogController.addComment);

// Route to update the likes of a blog post
router.post("/:id/likes", BlogController.updateLikes);

module.exports = router;
