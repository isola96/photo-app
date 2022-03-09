const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album_validation');

/* Get users albums */
router.get('/', albumController.getAlbums);

/* Get a users specific album */
router.get('/:albumId', albumController.getOneAlbum);

/* Store a new album */
router.post('/', albumValidationRules.createRules, albumController.store);

/* Update a users specific album */
router.put('/:albumId', albumValidationRules.updateRules,albumController.update);

/* Add photo to an album */
router.post('/:albumId/photos', albumValidationRules.addPhotoToAlbum, albumController.addPhoto);

module.exports = router;