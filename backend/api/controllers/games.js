const validators = require('../validators/games');
const gameServices = require('../services/games');

module.exports = {
	save: async (req, res, next) => {
		const { win, human_first, ai_active } = req.body;
		let userId;
		if (req.isAuthenticated()) {
			userId = ((req.user || {})).id;
		}

		const { errors: validationErrs, result, isValid: gameSaveValid} = await validators.validateGameSave(
			{ win, human_first, ai_active, userId })

		if (gameSaveValid) {
			const { newGame, error, isValid } = await gameServices.saveGame(result)
			if (isValid) return res.status(201).json(newGame);
			else return res.status(401).json(error)
		}

		return res.status(401).json(validationErrs)
	},
	delete: (req, res, next) => {
		return res.json('Patching to game route');
	}
};
