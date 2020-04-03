module.exports = {
	save: (req, res, next) => {
		return res.json('Saving to game route');
	},
	delete: (req, res, next) => {
		return res.json('Patching to game route');
	}
};
