const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
});

router.get('/game', async (req, res) => {

  res.render('game', {

      logged_in: req.session.logged_in
  });
});

router.get('/user/:email', async (req, res) => {
  try {
    const userData = await User.findOne({where:{email: req.params.email},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('game', {
      ...user,
      logged_in: req.session.logged_in
    });
  }
catch(err){
  console.log(err)
}});

// Got rid of withAuth middleware... So people can play without account as a guest
router.get('/dashboard', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.render('dashboard', {
      name: "Guest",
      logged_in: false
    });
  }
});

router.get('/game', (req, res) => {
  console.log(req.body)
  res.render('game')
})

router.get('/login', (req, res) => { res.render('login'); });

router.get('/signup', async (req, res) => { res.render('signup'); });

module.exports = router;
