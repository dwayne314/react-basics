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

		return {
			newGame,
			error,
			isValid
		}
	}
};
