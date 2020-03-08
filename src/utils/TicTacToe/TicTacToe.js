// Utility Dependencies
import { getRandomNumber } from '../utils';


export const getLocation = (id) => {
	let location;
	if (id < 3) {
		 location = [0, id];
	}
	else if (id < 6) {
		location = [1, id - 3];
	}
	else {
		location = [2, id - 6];
	}
	return {x: location[0], y: location[1]};
};

export const getPositionIcon = (location, board) => {
	const positionDisplay = board[location.x][location.y];
	// console.log(positionDisplay)
	// console.log(location)
	if (Boolean(positionDisplay.length)) {
		return positionDisplay[0];
	}
	return Boolean(positionDisplay.length);
}

export const checkGameOver = (board) => {
	const winningCombinations = [
		[
			{x: 0, y: 0},
			{x: 1, y: 0},
			{x: 2, y: 0}
		],
		[
			{x: 0, y: 1},
			{x: 1, y: 1},
			{x: 2, y: 1}
		],
		[
			{x: 0, y: 2},
			{x: 1, y: 2},
			{x: 2, y: 2}
		],
		[
			{x: 0, y: 0},
			{x: 0, y: 1},
			{x: 0, y: 2}
		],
		[
			{x: 1, y: 0},
			{x: 1, y: 1},
			{x: 1, y: 2}
		],
		[
			{x: 2, y: 0},
			{x: 2, y: 1},
			{x: 2, y: 2}
		],
		[
			{x: 0, y: 0},
			{x: 1, y: 1},
			{x: 2, y: 2}
		],
		[
			{x: 2, y: 0},
			{x: 1, y: 1},
			{x: 0, y: 2}
		]
	];
	const winningCombination = winningCombinations.map((combo, index) => {
		const winningComboIcons = combo
		    .map(location => getPositionIcon(location, board))
		    .filter((combo) => {return combo !== false});
		const filteredCombo = [...new Set(winningComboIcons)];
		return (filteredCombo.length === 1 && winningComboIcons.length === 3) ?
			{
				location: combo,
				winner: filteredCombo[0]
			} :
			undefined;
	}).filter(combo => combo !== undefined);

	const isTie = board
	    .reduce((row, acc) => [...acc, ...row], [])
	    .filter((position) => position.length !== 0).length === 9;
	
	if (winningCombination.length > 0) {
		return winningCombination[0];
	}
	else if (isTie) {
		return {
			location: undefined,
			winner: ""
		};
	}
	return false;
};

export const makeRandomComputerMove = (board) => {
	const location = {};
	location.x = getRandomNumber(0, board.length - 1);
	location.y = getRandomNumber(0, board.length - 1);
	if (!getPositionIcon(location, board)) {
		return location;
	
	}
	return makeRandomComputerMove(board);	
};

export const getPositionStatusClass = (gameMode, humanIcon, gameWinner) => {
	const cpuPlayingWinStatus = gameMode === 1 ? ' winner' : ' loser';
	const statusClass = humanIcon === gameWinner ? ' winner' : cpuPlayingWinStatus;

	return statusClass
}
