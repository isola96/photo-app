/**
 * Album Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create Album validation rules
  */
 const createRules = [
     body('title').exists().isLength({ min: 3 })
 ];
 
 /**
  * Update Album validation rules
  */
 const updateRules = [
     body('title').optional().isLength({ min: 3 }),
 ];

 const addPhotoToAlbum = [
    body('photo_id').exists().isInt().custom(async value => {
        const photo = await new models.Photo({ id: value }).fetch({ require: false });
        if (!photo) {
            return Promise.reject(`Photo with id ${value} does not exist`);
        }
        return Promise.resolve();
    }),
 ];
 
 module.exports = {
     createRules,
     updateRules,
     addPhotoToAlbum
 }
 