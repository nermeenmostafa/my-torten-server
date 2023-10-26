const router = require("express").Router();
const Comment=require("../models/Comment.model");
const torte=require("../models/Torte.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Create a new comment
router.post('/comments', async (req, res) => {
    try {
      const { text, name } = req.body;
      console.log(text, name)
      const comment = new Comment({ text, name });
      const savedComment = await comment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ error: 'Error creating comment' });
      console.log(error)
    }
  });
  
  // Retrieve all comments
  router.get('/comments', async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving comments' });
    }
  });


module.exports = router;