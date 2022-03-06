/**
 * Profile Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 const updateRules = [
     body('password').optional().isLength({ min: 4 }),
     body('first_name').optional().isLength({ min: 2 }),
     body('last_name').optional().isLength({ min: 2 }),
 ];
 
 module.exports = {
     updateRules,
 }