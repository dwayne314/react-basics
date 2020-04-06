const Users = require('../models/users');


module.exports = {
	createUser: async(attrs) => {
		let newUser = null;
		let error = null;
		let isValid = true;

		try {
			newUser = await Users.create(attrs)	
		} catch (err) {
			error = err;
			isValid = false;
		}

		return {
			newUser,
			error,
			isValid
		}
		
	}
};
