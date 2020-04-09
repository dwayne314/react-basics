export const getWins = (state) => {
	return state.games.reduce((wins, newGame) => {
		const addGame = (newGame === 1) ? 1 : 0;
		return wins + addGame;
	}, 0);
};

export const getLosses = (state) => {
	return state.games.reduce((losses, newGame) => {
		const addGame = (newGame === -1) ? 1 : 0;
		return losses + addGame;
	}, 0);
};

export const getTies = (state) => {
	return state.games.reduce((ties, newGame) => {
		const addGame = (newGame === 0) ? 1 : 0;
		return ties + addGame;
	}, 0);
};

export const getGameMode = state => state.gameState.gameMode;

export const getGameBoard = state => state.gameState.currentBoard;

export const getCurrentPlayer = state => state.gameState.currentPlayer;

export const getHumanIcon = state => state.gameState.humanIcon;

export const getCpuIcon = state => state.gameState.cpuIcon;

export const isGameOver = state => state.gameState.isGameOver;

export const isComputerMove = state => state.gameState.isComputerMove;

export const getGameOrder = state => state.gameState.gameOrder;

export const isAIActive = state => state.gameState.isAIActive;

export const isSessionSaved = state => state.isSessionSaved;

export const hamburgerMenuHiddenCls = state => state.hamburgerMenuHiddenCls;


export const getErrors = state => state.errors;
