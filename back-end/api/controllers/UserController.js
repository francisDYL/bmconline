/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');
var jwtConfig = require('../../config/jwt');

module.exports = {
	signup: async function (req, res) {
		const userToCreate = req.body.user;
		try {
			existingUser = await User.findOne({ email: userToCreate.email });
			if (existingUser) {
				res.status(409);
				return res.json({ success: false, message: 'An user using this email already exist' });
			} else {
				const createdUser = User.create(userToCreate).fetch();
				res.satus(200);
				res.json({ success: true, message: 'Successfully signup', user: createdUser });
			}
		}
		catch (error) {
			sails.log.error(error);
			res.status(500);
			res.json({ success: false, message: 'internal server error' });
		}
	},

	signin: async function (req, res) {
		const userEmail = req.body.email;
		const password = req.body.password;
		try {
			const savedUser = await User.findOne({ email: userEmail }).populate('projects');
			if (!savedUser) {
				res.status(404);
				res.json({ success: false, message: 'User not found check email!' });
			} else {
				const hashPassword = savedUser.password;
				const isValid = await User.comparePassword(password, hashPassword);
				if (!isValid) {
					res.status(403);
					res.json({ success: false, message: 'Invalid password' });
				}
				else {
					const token = jwt.sign({ user: savedUser }, jwtConfig.SECRET_KEY, { expiresIn: jwtConfig.EXPIRE_DATE });
					res.status(200);
					res.json({ success: true, message: 'Successfully signin', user: savedUser, token: token });

				}
			}
		}
		catch (error) {
			sails.log.error(error);
			res.status(500);
			res.json({ success: false, message: 'internal server error' });
		}

	},

	update: async function (req, res) {
		res.json({ success: true, message: 'updating feature in construction' });
	}

};

