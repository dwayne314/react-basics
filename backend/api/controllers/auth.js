const authServices = require('../services/auth');


module.exports = {
	register: async (req, res, next) => {
		const {first_name, last_name, username, password} = req.body;
		const {newUser, error, isValid} = await authServices.createUser(
			{ first_name, last_name, username, password })
		// If error here I need to send the error as error
		console.log(newUser, error, isValid)
		if (isValid) {
			return res.status(201).json(newUser)
		}
		else {
			return res.status(400).json(error)
		}
	},
	login: (req, res, next) => {
		return res.json('Posting to login route');
	},
	logout: (req, res, next) => {
		return res.json('Posting to logout route');
	}
};




