
const express = require('express');
const router = express.Router();
const { User, Thought } = require('../../database/models');

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE NEW USER
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username, email });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE USER BY ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE USER BY ID
router.delete('/:id', async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (!userToDelete) return res.status(404).json({ message: 'User not found' });
    await Thought.deleteMany({ _id: { $in: userToDelete.thoughts } });
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'User and thoughts deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD A FRIEND
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const friend = await User.findById(req.params.friendId);
    if (!friend) return res.status(404).json({ message: 'Friend not found' });
    user.friends.addToSet(friend._id);
    await user.save();
    res.json({ message: 'Friend added successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// REMOVE A FRIEND
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const friend = await User.findById(req.params.friendId);
    if (!friend) return res.status(404).json({ message: 'Friend not found' });
    user.friends.pull(friend._id);
    await user.save();
    res.json({ message: 'Friend removed successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
