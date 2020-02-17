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
	console.log(board)
	console.log(location)
	const positionDisplay = board[location.x][location.y];
	// console.log(positionDisplay)
	// console.log(location)
	if (Boolean(positionDisplay.length)) {
		return positionDisplay[0]
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
	]
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
			undefined
	}).filter(combo => combo !== undefined);

	const isTie = board.reduce((row, acc) => {
		return [...acc, ...row]
	}, []).filter((position) => position.length !== 0).length === 9
	
	if (winningCombination.length > 0) {
		return winningCombination[0] 
	}
	else if (isTie) {
		return {
			location: undefined,
			winner: ""
		} 
	}
	return false
};

export const makeRandomComputerMove = (board) => {
	const location = {};
	location.x = Math.floor(Math.random() * (3 - 0) + 0);
	location.y = Math.floor(Math.random() * (3 - 0) + 0);
	if (!getPositionIcon(location, board)) {
		return location
	
	}
	return makeRandomComputerMove(board);
	
};