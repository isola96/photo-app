/**
 * Profile Controller
 */

 const debug = require('debug')('photos:profile_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 
 /**
  * Get authenticated user's profile
  *
  * GET /
  */
 const getProfile = async (req, res) => {
     res.send({
         status: 'success',
         data: {
             user: req.user,
         }
     });
 }
 
 /**
  * Update authenticated user's profile
  *
  * PUT /
  */
 const updateProfile = async (req, res) => {
     // check for any validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 
     // get only the validated data from the request
     const validData = matchedData(req);
 
     try {
         const updatedUser = await req.user.save(validData);
         debug("Updated user successfully: %O", updatedUser);
 
         res.send({
             status: 'success',
             data: {
                 user: updatedUser,
             },
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new user.',
         });
         throw error;
     }
 }
 
 module.exports = {
     getProfile,
     updateProfile,
 }