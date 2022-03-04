/**
 * User Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create user validation rules
  */
 const createRules = [
    body('email').exists().isLength({min:6}),
    body('password').exists().isLength({min:8}),
    body('first_name').exists().isLength({min:2}),
    body('last_name').exists().isLength({min:2}),
 ];
 
 /**
  * Update user validation rules
  */
 const updateRules = [
     body('title').optional()
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 