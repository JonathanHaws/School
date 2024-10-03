
const mongoose = require('mongoose');
const db = require('./connection');
const { User, Thought } = require('./models');

const users = [
  {
    username: 'Jonathan',
    email: 'jonathan@example.com',
    thoughts: [{ thoughtText: 'Automatic Test Seeded Thought 1' }]
  },
  {
    username: 'Mark',
    email: 'mark@example.com',
    thoughts: [{ thoughtText: 'Automatic Test Seeded Thought 2' }]
  }
];

(async () => {
  try {
    await db;
    await User.deleteMany({});
    await Thought.deleteMany({});
    for (const user of users) {
      const newUser = new User({ username: user.username, email: user.email });
      const savedUser = await newUser.save();
      for (const thought of user.thoughts) {
        const newThought = new Thought({ ...thought, username: savedUser.username });
        const savedThought = await newThought.save();
        savedUser.thoughts.push(savedThought._id);
      }
      await savedUser.save();
    }
    console.log('Seed successful');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
})();
