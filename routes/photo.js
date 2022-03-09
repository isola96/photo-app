const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo_validation');

/* Get a users photos */
router.get('/', photoController.getPhotos);

/* Get a users specific photo */
router.get('/:photoId', photoController.show);

/* Store a new photo */
router.post('/', photoValidationRules.createRules, photoController.store);

/* Update a users specific photo */
router.put('/:photoId', photoValidationRules.updateRules, photoController.update);

module.exports = router;