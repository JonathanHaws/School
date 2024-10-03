
const express = require('express');
const router = express.Router();
const { Thought, User } = require('../../database/models');

// GET ALL THOUGHTS
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET THOUGHT BY ID 
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE NEW THOUGHT
router.post('/', async (req, res) => {
  const { thoughtText, username, userId } = req.body;
  const newThought = new Thought({ thoughtText, username, userId });
  try {
    const savedThought = await newThought.save();
    const user = await User.findById(userId);
    user.thoughts.push(savedThought._id);
    await user.save();
    res.status(201).json(savedThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE THOUGHT BY ID
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE THOUGHT BY ID
router.delete('/:id', async (req, res) => {
  try {
    const thoughtToDelete = await Thought.findById(req.params.id);
    if (!thoughtToDelete) return res.status(404).json({ message: 'Thought not found' });
    await Thought.deleteOne({ _id: req.params.id });
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE NEW REACTION
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });
      thought.reactions.push(req.body);
      await thought.save();
      res.json({ message: 'Reaction added successfully', thought });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// DELETE REACTION BY ID
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    thought.reactions.pull({ _id: req.params.reactionId });
    await thought.save();
    res.json({ message: 'Reaction removed successfully', thought });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
