const validators = require('../validators/games');
const gameServices = require('../services/games');

module.exports = {
	save: async (req, res, next) => {
		const { status, human_first, ai_active } = req.body;
		let userId;
		if (req.isAuthenticated()) {
			userId = ((req.user || {})).id;
		}

		const { errors: validationErrs, result, isValid: gameSaveValid} = await validators.validateGameSave(
			{ status, human_first, ai_active, userId })

		if (gameSaveValid) {
			const { newGame, error, isValid } = await gameServices.saveGame(result)
			if (isValid) return res.status(201).json(newGame);
			else return res.status(401).json(error)
		}

		return res.status(401).json(validationErrs)
	},
	delete: async (req, res, next) => {
		let userId;
		if (req.isAuthenticated()) {
			userId = ((req.user || {})).id;

			const { isValid, error, deletedMessage } = await gameServices.deleteGames(userId);
			if (isValid) {
				return res.status(201).json(deletedMessage);
			}
			return res.status(401).json(error);
		}
		return res.status(401).json({auth: 'User not authenticated'});
	},
	get: async (req, res, next) => {
		let userId;
		if (req.isAuthenticated()) {
			userId = ((req.user || {})).id;

			const { isValid, error, games } = await gameServices.getGamesByUser(userId);
			if (isValid) {
				return res.status(201).json(games);
			}
			return res.status(401).json(error);
		}
		return res.status(401).json({auth: 'User not authenticated'});
	}	
};
