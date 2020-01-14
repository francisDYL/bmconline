var jwtConfig = require('../../config/jwt');
var jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
	const authorization = req.headers['authorization'];
	if ( typeof authorization === 'string' && authorization.substring(0, 7) === 'Bearer ') {
		const token = authorization.substring(7, authorization.length);
		jwt.verify(token, jwtConfig.SECRET_KEY, (error, data) => {
			if (error) {
				sails.log.error(error);
				res.status(401);
				return res.json({ error: 'Unauthorized request: invalid token' });
			}
			else {
				req.body.authenticatedUser = data.user;
				return next();
			}
		});
	}
	else {
		res.status(401);
		return res.json({ success: false, message: 'Unauthorized request: token not found' });
	}
};
