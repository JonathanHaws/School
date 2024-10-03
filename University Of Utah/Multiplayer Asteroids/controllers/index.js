const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const gameRoutes = require('./game')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/game', gameRoutes)

module.exports = router;
