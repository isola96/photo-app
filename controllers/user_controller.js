/**
 * User Controller
 */

const debug = require('debug')('photos:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all users
 *
 * GET /
 */
const index = async (req, res) => {
	const all_users = await models.User.fetchAll();

	res.send({
		status: 'success',
		data: {
			users: all_users,
		}
	});
}

/**
 * Get a specific user
 *
 * GET /:exampleId
 */
const show = async (req, res) => {
	const user = await new models.User({ id: req.params.userId })
		.fetch();

	res.send({
		status: 'success',
		data: {
			user,
		}
	});
}

/**
 * Store a new user
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

	console.log("The valid data:", validData);

	try {
		const user = await new models.User(validData).save();
		debug("Created new user successfully: %O", user);

		res.send({
			status: 'success',
			data: {
				user
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}

/**
 * Update a specific user
 *
 * PUT /:userId
 */
const update = async (req, res) => {
	const userId = req.params.userId;

	// make sure user exists
	const user = await new models.User({ id: userId }).fetch({ require: false });
	if (!user) {
		debug("User to update was not found. %o", { id: userId });
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

	console.log("The valid data:", validData);

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

module.exports = {
	index,
	show,
	store,
	update
}
