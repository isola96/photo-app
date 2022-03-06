/**
 * Album Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create Album validation rules
  */
 const createRules = [
     body('title').exists().isLength({ min: 2 }),
     body('user_id').exists().isLength({ min: 1 }),
 ];
 
 /**
  * Update Album validation rules
  */
 const updateRules = [
     body('title').optional().isLength({ min: 2 }),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 