/**
 * Album Controller
 */

const debug = require('debug')('photos:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get users albums
 *
 * GET /
 */
 const getAlbums = async (req, res) => {
    await req.user.load('albums');

    try {
    res.status(200).send({
        status: 'success',
        data: req.user.related('albums')
    })
    } catch (error) {
        res.status(500).send({
            status: 'fail',
            message: "Exception thrown in database when getting a new album."
        });
        throw error;
    }
};

/**
 * Get a users specific album
 *
 * GET /:albumId
 */
 const getOneAlbum = async (req, res) => {
    await req.user.load('albums');

    const oneAlbum = await new models.Album({ id: req.params.albumId });

    const albumRelation = req.user.related('albums');

    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found in your list'
        });
    }

    const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos']});

    try {
        res.status(200).send({
            status: 'success',
            data: album
        })
    } catch(error) {
        res.status(500).send({
            status: 'fail',
            message: error
        });
        throw error;
    }
};


/**
 * Store a new album
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
        const album = await new models.Album(validData).save();

        debug('Created new album successfully: %O', album);

        res.status(200).send({
            status: 'success',
            data: album
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album.'
        });
        throw error;
    }
};


/**
 * Update a users specific album
 *
 * PUT /:albumId
 */
 const update = async (req, res) => {
    await req.user.load('albums');

    const oneAlbum = await new models.Album({ id: req.params.albumId });

    const albumRelation = req.user.related('albums');

    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail   ',
            data: 'An album with that id could not be found in your list'
        });
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        });
    }

    const validData = matchedData(req);

    try {
        const updatedAlbum = await foundAlbum.save(validData);
        
        debug('Updated album successfully: %O', updatedAlbum);

        res.send({
            status: 'success',
            data: updatedAlbum
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating the album.'
        });
        throw error;
    }
};

/**
 * Add photo to an album
 *
 * POST /albums/albumId/photos
 */
 const addPhoto = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).send({ status : "fail", data: errors.array() });
    }

    const validData = matchedData(req); 

    validData.album_id = req.params.albumId;

    await req.user.load('albums');

    const oneAlbum = await new models.Album({ id: req.params.albumId });

    const albumRelation = req.user.related('albums');

    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found in your list'
        });
    }

    await req.user.load('photos');

    const onePhoto = await new models.Photo({ id: validData.photo_id });

    const photoRelation = req.user.related('photos');

    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'An photo with that id could not be found in your list'
        });
    }

    const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos'] });

    const photos = album.related('photos');

    const existingPhoto = photos.find(photo => photo.id == validData.photo_id);

    if (existingPhoto) {
        return res.status(422).send({
            status: 'fail',
            data: 'Photo exists already'
        })
    }

    try {
        await new models.AlbumPhoto(validData).save();

        res.status(200).send({
            status: 'success',
            data: null,
        });

    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to add photo",
		});
		throw error;
    }

};

module.exports = {
	getAlbums,
	getOneAlbum,
	store,
	update,
	addPhoto
}
