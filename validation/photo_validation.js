/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create Photo validation rules
  */
 const createRules = [
     body('title').exists().isLength({ min: 4 }),
     body('url').exists().isLength({ min: 4 }),
     body('comment').optional().isLength({ min: 3 }),
     body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	}),
 ];
 
 /**
  * Update Photo validation rules
  */
 const updateRules = [
     body('title').optional().isLength({ min: 4 }),
     body('url').optional().isLength({ min: 4 }),
     body('comment').optional().isLength({ min: 3 }),
     body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	})

 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 