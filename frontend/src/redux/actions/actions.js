export const GAME_OVER = 'GAME_OVER';
export const CHANGE_GAME_MODE = 'CHANGE_GAME_MODE';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const MAKE_MOVE = 'MAKE_MOVE';
export const CHANGE_CURRENT_PLAYER = 'CHANGE_CURRENT_PLAYER';
export const CHANGE_HUMAN_ICON = 'CHANGE_HUMAN_ICON';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SET_COMPUTER_MOVE = 'SET_COMPUTER_MOVE';
export const CHANGE_GAME_ORDER = 'CHANGE_GAME_ORDER';
export const TOGGLE_HAMBURGER_MENU = 'TOGGLE_HAMBURGER_MENU';
export const TOGGLE_AI_ACTIVE = 'TOGGLE_AI_ACTIVE';
export const TOGGLE_SAVE_SESSION = 'TOGGLE_SAVE_SESSION';
export const RESET_SCORE = 'RESET_SCORE';


export const createGameOver = (winner, humanIcon, cpuIcon) => {
	let isWin;

	if (winner === humanIcon) {
		isWin = 1
	} 
	else if (winner === cpuIcon) {
		isWin = -1
	}
	else {
		isWin = 0
	}

	return {
		type: GAME_OVER,
		payload: {
			status: isWin
		}
	}
};

export const changeGameMode = (mode) => {
	return {
		type: CHANGE_GAME_MODE,
		payload: {
			gameMode: mode
		}
	}
};

export const clearBoard = () => {
	return {
		type: CLEAR_BOARD
	}
};

export const makeMove = (location, icon) => {
	return {
		type: MAKE_MOVE,
		payload: {
			location: location,
			icon: icon
		}
	}
};

export const changeCurrentPlayer = () => {
	return {
		type: CHANGE_CURRENT_PLAYER
	}
};

export const changeHumanIcon = () => {
	return {
		type: CHANGE_HUMAN_ICON,
	}
};

export const setGameOverStatus = (gameStatus) => {
	const { location, winner } = gameStatus;
	return {
		type: SET_GAME_OVER,
		payload: {
			location: location,
			winner: winner
		}
	}
};


export const setComputerMove = (isComputerMove) => {
	return {
		type: SET_COMPUTER_MOVE,
		payload: {
			isComputerMove: isComputerMove
		}
	}
};

export const changeGameOrder = (newOrder) => {
	return {
		type: CHANGE_GAME_ORDER,
		payload: {
			gameOrder: newOrder
		}
	}
};

export const toggleHamburgerMenu = (hiddenCls) => {
	const newHiddenCls = hiddenCls === '' ? ' hidden' : '';
	return {
		type: TOGGLE_HAMBURGER_MENU,
		payload: {
			hamburgerMenuHiddenCls: newHiddenCls
		}
	}
};

export const toggleAIActive = (activeStatus) => {

	return {
		type: TOGGLE_AI_ACTIVE,
		payload: {
			isAIActive: activeStatus
		}
	}
};

export const toggleSaveSession = (isSessionSaved) => {
	return {
		type: TOGGLE_SAVE_SESSION,
		payload: {
			isSessionSaved: isSessionSaved
		}
	}
};

export const resetScore = () => {
	return {
		type: RESET_SCORE
	}
};
