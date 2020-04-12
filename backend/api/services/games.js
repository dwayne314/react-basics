const Games = require('../models/games');


module.exports = {
	saveGame: async(attrs) => {
		let newGame = null;
		let error = null;
		let isValid = true;

		try {
			newGame = await Games.create(attrs)	
		} catch (err) {
			error = err;
			isValid = false;
		}

		return { newGame, error, isValid }
	},
	deleteGames: async(userId) => {
		let error = null;
		let isValid = true;
		let deletedMessage = null;
		try {
			await Games.deleteMany({played_by: userId});
			deletedMessage = 'games deleted'
		} catch (err) {
			error = err;
			isValid = false;
		}

		return { error, isValid, deletedMessage};
	},
	getGamesByUser: async(userId) => {
		let error = null;
		let isValid = true;
		let games = null;
		try {
			games = await Games.find({played_by: userId});
		} catch (err) {
			error = err;
			isValid = false;
		}

		return { error, isValid, games};
	}
};
