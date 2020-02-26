export const getWins = (state) => {
	return state.games.reduce((wins, newGame) => {
		const addGame = (newGame === 1) ? 1 : 0
		return wins + addGame
	}, 0)
};

export const getLosses = (state) => {
	return state.games.reduce((losses, newGame) => {
		const addGame = (newGame === -1) ? 1 : 0
		return losses + addGame
	}, 0)
};

export const getTies = (state) => {
	return state.games.reduce((ties, newGame) => {
		const addGame = (newGame === 0) ? 1 : 0
		return ties + addGame
	}, 0)
};
