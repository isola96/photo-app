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
     body('user_id').exists().isLength({ min: 1 }),
 ];
 
 /**
  * Update Photo validation rules
  */
 const updateRules = [
     body('title').optional().isLength({ min: 4 }),
     body('url').optional().isLength({ min: 4 }),
     body('comment').optional().isLength({ min: 3 }),
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }
 