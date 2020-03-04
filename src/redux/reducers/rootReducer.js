// Utility Dependencies
import {
	GAME_OVER,
	CHANGE_GAME_MODE,
	CLEAR_BOARD,
	MAKE_MOVE,
	CHANGE_HUMAN_ICON,
	CHANGE_CURRENT_PLAYER
} from '../actions/actions';


const initialState = {
	games: [],
	gameState: {
		gameOrder: 'A',
		gameMode: 0,
		currentPlayer: 'X',
		humanIcon: 'X',
		cpuIcon: 'O',
		currentBoard: [
			[[], [], []],
			[[], [], []],
			[[], [], []]
		]
	}
};

export const rootReducer = (state=initialState, action) => {
	switch (action.type) {
		case GAME_OVER:
			const { status } = action.payload;
			return {
				...state,
				games: [...state.games, status]
			};
		case CHANGE_GAME_MODE:
			const { gameMode } = action.payload;
			return {
				...state,
				gameState: Object.assign({}, state.gameState, {gameMode: gameMode})
			};
		case CLEAR_BOARD:
			const emptyBoard = [
				[[], [], []],
				[[], [], []],
				[[], [], []]
				];
			return {
				...state,
				gameState: {
					...state.gameState,
					currentBoard: emptyBoard
				}
			};
		case MAKE_MOVE:
			const { location, icon } = action.payload;
			const newBoard = [...state.gameState.currentBoard];
			newBoard[location.x][location.y] = [icon];

			return {
				...state,
				gameState: {
					...state.gameState,
					currentBoard: newBoard
				}
			};
		case CHANGE_HUMAN_ICON:
			return {
				...state,
				gameState: {
					...state.gameState,
					humanIcon: (state.gameState.humanIcon === 'X') ? 'O' : 'X',
					cpuIcon: (state.gameState.humanIcon === 'O') ? 'O' : 'X'
				}
			};
		case CHANGE_CURRENT_PLAYER:
			return {
				...state,
				gameState: {
					...state.gameState,
					currentPlayer: (state.gameState.currentPlayer === 'X') ? 'O' : 'X'
				}
			};
		default:
			return state;
	}
};
