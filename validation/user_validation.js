/**
 * User Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create user validation rules
  */
 const createRules = [
    body('email').exists().isLength({min:6}).custom(async value => {
		const user = await new models.User({ email: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Email already exists.");
		}

		return Promise.resolve();
	}),
    body('password').exists().isLength({min:6}),
    body('first_name').exists().isLength({min:3}),
    body('last_name').exists().isLength({min:3}),
 ];
 
 /**
  * Update user validation rules 
  */
 const updateRules = [
     body('email').optional().isLength({min:6}),
     body('password').optional().isLength({min:6}),
    body('first_name').optional().isLength({min:3}),
    body('last_name').optional().isLength({min:3}),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
