const { User, Post, Comment } = require('../models');
const express = require('express');
const router = express.Router();
const getPosts = require('./getPosts');

router.get('/', async (req, res) => { const posts = await getPosts(req); res.render('pages/home', { title: 'Home', posts, user: req.session?.user?.username });});

router.get('/dashboard', async (req, res) => {
    if(!req.session?.user) { return res.redirect('/login'); }
    const posts = await getPosts(req, req.session?.user?.id);
    res.render('pages/dashboard', { title: 'DASHBOARD', posts, user: req.session?.user?.username });
});

router.get('/login',   async (req, res) => { res.render('pages/login');});

router.get('/signup',  async (req, res) => { res.render('pages/signup'); });

router.get('/logout',  async (req, res) => { await req.session?.destroy(); res.redirect('/'); });

router.post('/posts',  async (req, res) => { 
    if(!req.session?.user) { return res.redirect('/login'); }
    const post = await Post.create({ title: req.body.title, content: req.body.content, userId: req.session?.user?.id }); 
    res.status(200).send();
});

router.post('/login',  async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).render('pages/login', { error: 'Wrong username or password.' });
    }
    req.session.user = user; 
    res.redirect('/');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (await User.findOne({ where: { username } })) {
      return res.render('pages/signup', { error: 'Username already exists.' });
    }
    const user = await User.create({ username, password });
    req.session.user = user;
    res.redirect('/');
});

router.delete('/posts/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (req.session?.user && post && post.userId === req.session.user.id) { await post.destroy();}
    res.redirect(303, '/');
});

router.delete('/comments/:id', async (req, res) => {
    const comment = await Comment.findByPk(req.params.id); //console.log(comment)
    if (req.session?.user && comment && comment.userId === req.session.user.id) { await comment.destroy();}
    res.status(200).send();
});

router.post('/comments', async (req, res) => { console.log(req.body); 
    if(!req.session?.user) { return res.redirect('/login'); }
    await Comment.create({ content: req.body.comment, userId: req.session?.user?.id, postId: req.body.id});
    res.status(200).send();
});

module.exports = router;