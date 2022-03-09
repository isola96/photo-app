const express = require('express');
const router = express.Router();
const userValidationRules = require('../validation/user_validation');
const authController = require('../controllers/auth_controller');
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'Welcome to my photo app' }});
});

// Register a new user
router.post('/register', userValidationRules.createRules, authController.register);

router.use('/albums', auth.basic, require('./album'));
router.use('/photos', auth.basic, require('./photo'));

module.exports = router;
