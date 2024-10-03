
const express = require('express');
const router = express.Router();
const userRoutes = require('./api/user');
const thoughtRoutes = require('./api/thought');
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);
module.exports = router;
