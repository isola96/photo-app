const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/album', require('./album'));
router.use('/photo', require('./photo'));
router.use('/user', require('./user'));
router.use('/profile', auth.basic, require('./profile'));

module.exports = router;
