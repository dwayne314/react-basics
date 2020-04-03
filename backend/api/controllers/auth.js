module.exports = {
	register: (req, res, next) => {
		return res.json('Posting to register route');
	},
	login: (req, res, next) => {
		return res.json('Posting to login route');
	},
	logout: (req, res, next) => {
		return res.json('Posting to logout route');
	}
};
