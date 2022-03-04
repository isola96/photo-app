const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
// const albumValidationRules = require('../validation/album');

/* Get all albums */
router.get('/', albumController.index);

/* Get a specific album */
router.get('/:albumId', albumController.show);

/* Store a new album */
router.post('/', albumController.store);

// albumValidationRules.createRules,

/* Update a specific album */
router.put('/:albumId', albumController.update);

//albumValidationRules.updateRules

/* Destroy a specific album */
router.delete('/:albumId', albumController.destroy);

module.exports = router;