const authServices = require('../services/auth');
const passport = require('passport');
const validators = require('../validators/auth');


module.exports = {
	register: async (req, res, next) => {
		const { first_name, last_name, username, password } = req.body;
		const { errors: validationErrs, result, isValid: registrationValid} = await validators.validateRegistration(
			{ first_name, last_name, username, password })

		if (registrationValid) {
			const { newUser, error, isValid } = await authServices.createUser(
				{ first_name, last_name, username, password })	

			if (isValid) return res.status(201).json(newUser);
			else return res.status(401).json(error)
		}

		return res.status(401).json(validationErrs)
	},
	login: (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
			// When using custom callback the user must be manually get logged in (added to req and placed on the session)
			if (err) return next(err);
			if (!user) return res.status(401).json({auth: 'Invalid username or password'});
			req.login(user, err => {
				if (err) res.status(401).json({auth: 'User could not be logged in'});
				return res.status(201).json(user);	
			})
			
		})(req, res, next)
	},
	logout: (req, res, next) => {
		return res.json('Posting to logout route');
	}
};
