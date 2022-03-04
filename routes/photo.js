const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
// const photoValidationRules = require('../validation/photo');

/* Get all photos */
router.get('/', photoController.index);

/* Get a specific photo */
router.get('/:photoId', photoController.show);

/* Store a new photo */
router.post('/', photoController.store);
// photoValidationRules.createRules,

/* Update a specific photo */
router.put('/:photoId', photoController.update);
// photoValidationRules.updateRules,

/* Destroy a specific photo */
router.delete('/:photoId', photoController.destroy);

module.exports = router;