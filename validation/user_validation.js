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
     body('email').optional().isLength({min:6}),
     body('password').optional().isLength({min:8}),
    body('first_name').optional().isLength({min:2}),
    body('last_name').optional().isLength({min:2}),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
