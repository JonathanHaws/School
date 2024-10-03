const sequelize = require('../config/connection');
const { User, Post , Comment } = require('../models');

const userData = [
  {
    username: 'Jon',
    password: 'animals1',
  },
  {
    username: 'Jonathan',
    password: 'password2',
  },
];

const postData = [
  {
    title: 'Testing super long titles to make sure not messed up by styling',
    content: "Also testing super long content in the post to make sure that is wrapping correctly and not accidentally going off screen. Changing the property max width on the div seems to have fixed the issue and made it so there isnt any problems with displaying posts!",
    userId: 1,
  },
  {
    title: 'Test 2',
    content: 'Second test post here 2',
    userId: 2,
  },
];

const commentData = [
  {
    content: 'This is testing to see how long a comment has to be before it starts messing up the page',
    userId: 1,
    postId: 1,
  },
  {
    content: 'This is a test comment to test how multiple comments on one post will work',
    userId: 1,
    postId: 1,
  },
  {
    content: 'This is the third comment on one post to verify working',
    userId: 1,
    postId: 1,
  },
  {
    content: 'Tescomment2',
    userId: 2,
    postId: 1,
  },
  {
    content: 'Third comment',
    userId: 1,
    postId: 2,
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create(user, {
      individualHooks: true,
    });
  }

  for (const post of postData) {
    await Post.create(post);
  }

  for (const comment of commentData) {
    await Comment.create(comment);
  }

  process.exit(0);
};

seedDatabase();