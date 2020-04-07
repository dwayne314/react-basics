const validatePassword = (password, passwordHash) => {
	return password === passwordHash;
};


module.exports = {
	validatePassword
};
