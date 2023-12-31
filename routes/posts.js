const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Post } = require("../models");
const { authenticateUser } = require("../middleware/auth");

// Create a new Post
router.post("/", authenticateUser, async (req, res) => {
  const { title, content, MajorId } = req.body;
  const UserId = req.session.userId;

  try {
    const newPost = await Post.create({ title, content, UserId, MajorId });
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//
router.get("/", async (req, res) => {
  try {
    const whereClause = {};
    if (req.query.majorId) {
      whereClause.MajorId = req.query.majorId;
    }
    const allPosts = await Post.findAll({ where: whereClause });

    res.status(200).json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Retrieve a specific Post by ID
router.get("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a Post
router.put("/:id", authenticateUser, async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post
    // if (req.session.user.id !== post.userId) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    await post.update({ title, content });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a Post
router.delete("/:id", authenticateUser, async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the authenticated user is the owner of the post
    // if (req.session.user.id !== post.userId) {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
