const bcrypt = require('bcrypt');


function setUpdatedAt(next) {
	this.update({}, { $set: { updated_at: new Date() }});
	next();
};

function hashPassword(next) {
	this.password = bcrypt.hashSync(this.password, 10);
	next();
};

module.exports = {
	setUpdatedAt,
	hashPassword
};
