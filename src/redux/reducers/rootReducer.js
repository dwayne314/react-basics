// Utility Dependencies
import {
	GAME_OVER,
	CHANGE_GAME_MODE,
	CLEAR_BOARD,
	MAKE_MOVE,
	CHANGE_HUMAN_ICON,
	CHANGE_CURRENT_PLAYER,
	SET_GAME_OVER,
	SET_COMPUTER_MOVE,
	CHANGE_GAME_ORDER
} from '../actions/actions';


const initialState = {
	games: [],
	gameState: {
		isComputerMove: false,
		lastFirstMove: 1,
		isGameOver: false,
		gameOrder: 'H',
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
			const computerMoveTrue = gameMode === 1 ? false : state.gameState.isComputerMove;
			return {
				...state,
				gameState: {
					...state.gameState,
					gameMode: gameMode,
					isComputerMove: computerMoveTrue
				}
			};
		case CLEAR_BOARD:
			const emptyBoard = [
				[[], [], []],
				[[], [], []],
				[[], [], []]
				];

			let { gameOrder, lastFirstMove } = state.gameState;
			let cpuGoesFirst;

			if (gameOrder === 'H') {
				cpuGoesFirst = false;
			}
			else if (gameOrder === 'C') {
				cpuGoesFirst = true;
			}
			else if (gameOrder === 'A' && lastFirstMove === 1) {
				cpuGoesFirst = true
			}
			else {
				cpuGoesFirst = false
			}
			const currentLastFirstMove = cpuGoesFirst === true ? 0 : 1

			return {
				...state,
				gameState: {
					...state.gameState,
					currentBoard: emptyBoard,
					isComputerMove: cpuGoesFirst,
					isGameOver: false,
					lastFirstMove: currentLastFirstMove
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
		case SET_GAME_OVER:
			return {
				...state,
				gameState: {
					...state.gameState,
					isGameOver: action.payload,
					isComputerMove: false,
				}
			}
		case SET_COMPUTER_MOVE:
			const { isComputerMove } = action.payload;
			return {
				...state,
				gameState: {
					...state.gameState,
					isComputerMove: isComputerMove
				}
			}
		case CHANGE_GAME_ORDER:
			const newGameOrder = action.payload.gameOrder
			return {
				...state,
				gameState: {
					...state.gameState,
					gameOrder: newGameOrder
				}
			}
		default:
			return state;
	}
};
