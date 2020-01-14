/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
	// ```
	// By convention, this is a good place to set up fake data during development.

	// For example:
	// ```;
	// Set up fake development data (or if we already have some, avast)
	if (await User.count() > 0) {
		return;
	}

	let firstUser = await User.create( {
		email: 'admin@bmconline.com',
		lastName: 'admin',
		firstName:  'admin',
		password: 'admin',
		contacts: [],
		projects: []
	}).fetch();

	let firstProject = await Project.create({
		name: 'testProject',
		owner:'admin@bmconline.com'
	}).fetch();

	let secondProject = await Project.create({
		name: 'testProject2',
		owner:'admin@bmconline.com'
	}).fetch();

	await User.addToCollection(firstUser.id,'projects').members([firstProject.id,secondProject.id]);

	console.log(await User.count());
	console.log(await Project.count());
};
