export const GAME_OVER = 'GAME_OVER';
export const CHANGE_GAME_MODE = 'CHANGE_GAME_MODE';

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