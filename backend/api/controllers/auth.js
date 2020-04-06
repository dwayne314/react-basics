const authServices = require('../services/auth');


module.exports = {
	register: async (req, res, next) => {
		const { first_name, last_name, username, password } = req.body;
		const { newUser, error, isValid } = await authServices.createUser(
			{ first_name, last_name, username, password })

		if (isValid) {
			return res.status(201).json(newUser)
		}
		return res.status(401).json(error)
	},
	login: (req, res, next) => {
		return res.json('Posting to login route');
	},
	logout: (req, res, next) => {
		return res.json('Posting to logout route');
	}
};
