/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		name: {type: 'string', required: true},
		owner:{type: 'string', required: true},
		keyPartners: {type: 'json'},
		keyActivities: {type: 'json'},
		keyRessources: {type: 'json'},
		valueProposition: {type: 'json'},
		customers: {type: 'json'},
		channel: {type: 'json'},
		customerSegment: {type: 'json'},
		costStructure: {type: 'json'},
		revenueStream: {type: 'json'},
		users: {
			collection: 'user',
			via: 'projects'
		}
	},

};

