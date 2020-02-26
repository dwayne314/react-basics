export const GAME_OVER = 'GAME_OVER';


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