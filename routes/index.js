const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/album', auth.basic, require('./album'));
router.use('/photo', auth.basic, require('./photo'));
router.use('/user', require('./user'));
router.use('/profile', auth.basic, require('./profile'));

module.exports = router;
