/**
 * User Controller
 */

const debug = require('debug')('photos:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const examples = await models.Example.fetchAll();

	res.send({
		status: 'success',
		data: examples,
	});
}

/**
 * Get a specific resource
 *
 * GET /:exampleId
 */
const show = async (req, res) => {
	const example = await new models.Example({ id: req.params.userId })
		.fetch();

	res.send({
		status: 'success',
		data: {
			user,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const user = await new models.User(validData).save();
		debug("Created new example successfully: %O", user);

		res.send({
			status: 'success',
			data: {
				user
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new example.',
		});
		throw error;
	}
}

/**
 * Update a specific resource
 *
 * PUT /:exampleId
 */
const update = async (req, res) => {
	const exampleId = req.params.userId;

	// make sure example exists
	const example = await new models.Example({ id: userId }).fetch({ require: false });
	if (!example) {
		debug("Example to update was not found. %o", { id: userId });
		res.status(404).send({
			status: 'fail',
			data: 'User Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedUser = await user.save(validData);
		debug("Updated user successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: {
				user,
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

/**
 * Destroy a specific resource
 *
 * DELETE /:exampleId
 */
const destroy = (req, res) => {
	res.status(400).send({
		status: 'fail',
		message: 'Nope',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
