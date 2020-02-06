/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {

	attributes: {
		email: {type: 'string', required: true},
		lastName: {type: 'string', required: true},
		firstName: {type: 'string', required: true},
		password: {type: 'string', required: true},
		contacts: {type: 'json'},
		projects: {
			collection: 'project',
			via: 'users'
		}
	},

	beforeCreate: function(value, callback){
		bcrypt.hash(value.password,10,(err,hash) => {
			if(err) {return callback(err);}
			value.password = hash;
			callback();
		});
	},

	comparePassword: async function(candidate, password) {
		return await  bcrypt.compare(candidate,password);
	}

};

