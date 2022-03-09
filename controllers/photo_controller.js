/**
 * Photo Controller
 */

const debug = require('debug')('photos:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get a users photos
 *
 * GET /
 */
 const getPhotos = async (req, res) => {
    const usersPhotos = await new models.Photo().where({ 'user_id': req.user.id }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    try {
        res.status(200).send({
            status: 'success',
            data: usersPhotos
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when loading photos'
        });
        throw error;
    }
};

/**
 * Get a users specific photo
 *
 * GET /photoId
 */
const show = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.Photo({ id: req.params.photoId });

    const photoRelation = req.user.related('photos');

    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'An photo with that id could not be found in your list'
        });
    }

    try {
        res.send({
            status: 'success',
            data: foundPhoto
        })
    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to add photo",
		});
		throw error;
    }
    
}


/**
 * Store a new photo
 *
 * POST /
 */
 const store = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() })
    }

    const validData = matchedData(req);

    validData.user_id = req.user.id;

    try {
        const photo = await new models.Photo(validData).save();

        debug('Created new photo successfully: %O', photo);

        res.status(200).send({
            status: 'success',
            data: photo
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo.'
        });
        throw error;
    }
};

/**
 * Update a users specific photo
 *
 * PUT /:photoId
 */
const update = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.Photo({ id: req.params.photoId });

    const photoRelation = req.user.related('photos');

    const foundPhoto = photoRelation.find(album => album.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'Photo with that ID could not be found in your list.'
        });
    }


    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({ 
            status: 'fail', 
            data: errors.array() 
        })
    }

    const validData = matchedData(req);

    try {
        const updatedPhoto = await foundPhoto.save(validData);
        
        debug('Updated photo successfully: %O', updatedPhoto);

        res.status(200).send({
            status: 'success',
            data: updatedPhoto
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating the photo.'
        });
        throw error;
    }
};

module.exports = {
	getPhotos,
	show,
	store,
	update,
}
