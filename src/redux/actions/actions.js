export const GAME_OVER = 'GAME_OVER';
export const CHANGE_GAME_MODE = 'CHANGE_GAME_MODE';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const MAKE_MOVE = 'MAKE_MOVE';
export const CHANGE_CURRENT_PLAYER = 'CHANGE_CURRENT_PLAYER';
export const CHANGE_HUMAN_ICON = 'CHANGE_HUMAN_ICON';


export const createGameOver = (userIcon) => {
	let isWin;

	if (userIcon === 'X') {
		isWin = 1
	} 
	else if (userIcon === 'O') {
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
}

export const changeGameMode = (mode) => {
	return {
		type: CHANGE_GAME_MODE,
		payload: {
			gameMode: mode
		}
	}
}

export const clearBoard = () => {
	return {
		type: CLEAR_BOARD
	}
}

export const makeMove = (location, icon) => {
	return {
		type: MAKE_MOVE,
		payload: {
			location: location,
			icon: icon
		}
	}
}

export const changeCurrentPlayer = () => {
	return {
		type: CHANGE_CURRENT_PLAYER
	}
}

export const changeHumanIcon = () => {
	return {
		type: CHANGE_HUMAN_ICON,
	}
}