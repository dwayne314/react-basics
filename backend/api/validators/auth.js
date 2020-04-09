const Validator = require('validator');
const utils = require('../utils');
const Users = require('../models/users');


const validateRegistration = async ({first_name='', last_name='', username='', password=''}) => {
	let errors = {};
	const usernameMinMax = {min: 4, max: 10};
	const passwordMinMax = {min: 4, max: 10};

	if (!first_name) {
		errors.first_name = utils.getErrors('auth', 'required', {fieldName: 'First name'})
	}
	if (!last_name) {
		errors.last_name = utils.getErrors('auth', 'required', {fieldName: 'Last name'})
	}
	if (!username) {
		errors.username = utils.getErrors('auth', 'required', {fieldName: 'Username'})
	} else if (!Validator.isLength(username, usernameMinMax)) {
		errors.username = utils.getErrors('auth', 'minMax', {...usernameMinMax, fieldName: 'Username'})
	}
	if (!password) {
		errors.password = utils.getErrors('auth', 'required', {fieldName: 'Password'})
	} else if (!Validator.isLength(password, passwordMinMax)) {
		errors.password = utils.getErrors('auth', 'minMax', {...passwordMinMax, fieldName: 'Password'})
	}

	await Users.findOne({ username: username})
	    .then((currentUser) => {
	    	if (currentUser) {
				errors.username = utils.getErrors('auth', 'duplicate', {fieldName: 'Username'})
	    	}
		})
	    .catch((err) => console.log(err))

	return {
		errors: utils.isEmpty(errors) ? null : errors,
		result: utils.isEmpty(errors) ? {first_name, last_name, username, password} : null,
		isValid: utils.isEmpty(errors)
	};
}


const validatePassword = (password, passwordHash) => {
	return password === passwordHash;
};


module.exports = {
	validatePassword,
	validateRegistration
};



