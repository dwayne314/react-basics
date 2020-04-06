function setUpdatedAt(next) {
	this.update({}, { $set: { updated_at: new Date() }});
	next();
};


module.exports = {
	setUpdatedAt
};
