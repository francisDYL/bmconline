/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
	'POST /user/signup': 'UserController.signup',
	'POST /user/signin': 'UserController.signin',
	'PUT /user/update': 'UserController.update',
	'POST /project': 'ProjectController.add',
	'PUT /project': 'ProjectController.update'

};
