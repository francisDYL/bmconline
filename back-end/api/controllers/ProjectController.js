/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	add: async function (req, res) {
		try {
			const user = req.body.authenticatedUser;
			const projectToSave = req.body.project;
			projectToSave.owner = user.email;
			const savedProject = await Project.create(projectToSave).fetch();
			await User.addToCollection(user.id,'projects').members([savedProject.id]);
			res.status(200);
			return res.json({ success: true, message: 'project successfully added', project: savedProject });
		}
		catch (error) {
			sails.log.error(error);
			res.status(500);
			return res.json({ success: false, message: 'an unknown error occur' });
		}
	},
	update: async function (req, res) {
		try {
			//const user = req.body.authenticatedUser;
			const projectToUpdate = req.body.project;
			const updatedProject = await Project.updateOne({ id: projectToUpdate.id }).set(projectToUpdate);
			//await User.addToCollection(user.id, 'projects').members([updatedProject.id]);
			res.status(200);
			return res.json({ success: true, message: 'project successfully updated', project: updatedProject });
		}
		catch (error) {
			sails.log.error(error);
			res.status(500);
			return res.json({ success: false, message: 'an unknown error occur' });
		}
	}

};

