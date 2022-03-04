const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/album', require('./album'));
router.use('/photo', require('./photo'));
router.use('/user', require('./user'));

module.exports = router;
