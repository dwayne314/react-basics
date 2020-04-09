// App Dependencies
import { rootReducer } from './rootReducer';
import {
	CHANGE_GAME_MODE,
	MAKE_MOVE,
	GAME_OVER,
	CLEAR_BOARD,
	CHANGE_HUMAN_ICON,
	CHANGE_CURRENT_PLAYER,
	SET_GAME_OVER,
	SET_COMPUTER_MOVE,
	CHANGE_GAME_ORDER,
	TOGGLE_HAMBURGER_MENU,
	TOGGLE_AI_ACTIVE,
	TOGGLE_SAVE_SESSION,
	RESET_SCORE,
} from '../actions/actions';
import {
	SET_ERRORS, SET_LOADING, SET_USER
} from '../actions/auth';


describe('RootReducer', () => {
	it('Change Game Mode', () => {
		const initialState = {
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 0
			}
		};
		const action = {
			type: CHANGE_GAME_MODE,
			payload: {
				gameMode: 1
			}
		};

		const expectedState = {
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 1,
				isComputerMove: false
			}
		};

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Change Game Mode', () => {
		const initialState = {
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 1,
				isComputerMove: true

			}
		};
		const action = {
			type: CHANGE_GAME_MODE,
			payload: {
				gameMode: 0
			}
		};

		const expectedState = {
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 0,
				isComputerMove: true
			}
		};

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Make move', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[[], [], []],
					[[], [], []],
					[[], [], []]
				]
			}
		};

		const action = {
			type: MAKE_MOVE,
			payload: {
				location: {
					x: 0,
					y: 0
				},
				icon: 'X'

			}
		};
		const expectedState = [
			[['X'], [], []],
			[[], [], []],
			[[], [], []]
		];

		const updatedState = rootReducer(initialState, action).gameState.currentBoard;
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Game Over', () => {
		const initialState = {
			games: []
		};
		const action = {
			type: GAME_OVER,
			payload: {
				status: 1
			}
		};
		
		const expectedState = {
			games: [1]
		};

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Clear Board clears the board', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[['X'], ['O'], ['X']],
					[[], [], []],
					[[], [], []]
				]
			}
		};
		const action = {
			type: CLEAR_BOARD
		};
		const expectedState = [
			[[], [], []],
			[[], [], []],
			[[], [], []]
		];

		const updatedState = rootReducer(initialState, action).gameState.currentBoard;
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Clear Board leaves the isComputerMove false if the gameOrder is H', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[[], [], []],
					[[], [], []],
					[[], [], []]
				],
				isComputerMove: false,
				lastFirstMove: 1,
				gameOrder: 'H'
			}
		};
		const action = {
			type: CLEAR_BOARD
		};
		const expectedComputerMove = false;
		const expectedLastFirstMove = 1;
		const expectedGameOrder = 'H';

		const { isComputerMove, lastFirstMove, gameOrder } = rootReducer(
			initialState, action).gameState;

		expect(isComputerMove).toStrictEqual(expectedComputerMove);
		expect(lastFirstMove).toStrictEqual(expectedLastFirstMove);
		expect(gameOrder).toStrictEqual(expectedGameOrder);
	})
	it('Clear Board makes the isComputerMove true if the gameOrder is C', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[['X'], [], []],
					[[], [], []],
					[[], [], []]
				],
				isComputerMove: true,
		        lastFirstMove: 1,
		        gameOrder: 'C'
			}
		};
		const action = {
			type: CLEAR_BOARD
		};
		const expectedComputerMove = true;
		const expectedLastFirstMove = 0;
		const expectedGameOrder = 'C';
		const { isComputerMove, lastFirstMove, gameOrder } = rootReducer(
			initialState, action).gameState;


		expect(isComputerMove).toStrictEqual(expectedComputerMove);
		expect(lastFirstMove).toStrictEqual(expectedLastFirstMove);
		expect(gameOrder).toStrictEqual(expectedGameOrder);
	})
	it('Clear Board makes the isComputerMove true if the gameOrder is A and the human went last', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[['X'], [], []],
					[[], [], []],
					[[], [], []]
				],
				isComputerMove: true,
		        lastFirstMove: 1,
		        gameOrder: 'A'
			}
		};
		const action = {
			type: CLEAR_BOARD
		};
		const expectedComputerMove = true;
		const expectedLastFirstMove = 0;
		const expectedGameOrder = 'A';
		const { isComputerMove, lastFirstMove, gameOrder } = rootReducer(
			initialState, action).gameState;

		expect(isComputerMove).toStrictEqual(expectedComputerMove);
		expect(lastFirstMove).toStrictEqual(expectedLastFirstMove);
		expect(gameOrder).toStrictEqual(expectedGameOrder);
	})
	it('Clear Board makes the isComputerMove false if the gameOrder is A and the cpu went last', () => {
		const initialState = {
			gameState: {
				currentBoard: [
					[['X'], [], []],
					[[], [], []],
					[[], [], []]
				],
				isComputerMove: true,
		        lastFirstMove: 0,
		        gameOrder: 'A'
			}
		};
		const action = {
			type: CLEAR_BOARD
		};
		const expectedComputerMove = false;
		const expectedLastFirstMove = 1;
		const expectedGameOrder = 'A';
		const { isComputerMove, lastFirstMove, gameOrder } = rootReducer(
			initialState, action).gameState;

		expect(isComputerMove).toStrictEqual(expectedComputerMove);
		expect(lastFirstMove).toStrictEqual(expectedLastFirstMove);
		expect(gameOrder).toStrictEqual(expectedGameOrder);
	})
	it('Change human Icon if the human icon is X', () => {
		const initialState = {
			gameState: {
				humanIcon: 'X',
				cpuIcon: 'O'
			}
		};
		const action = {
			type: CHANGE_HUMAN_ICON
		};
		const expectedState = {
			gameState: {
				humanIcon: 'O',
				cpuIcon: 'X'
			}
		};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);

	})
	it('Change human Icon if the human icon is O', () => {
		const initialState = {
			gameState: {
				humanIcon: 'O',
				cpuIcon: 'X'
			}
		};
		const action = {
			type: CHANGE_HUMAN_ICON
		};
		const expectedState = {
			gameState: {
				humanIcon: 'X',
				cpuIcon: 'O'
			}
		};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);

	})
	it('Change current player to O if it is X', () => {
		const initialState = {
			gameState: {
				currentPlayer: 'X'
			}
		};
		const action = {
			type: CHANGE_CURRENT_PLAYER
		};
		const expectedState = {
			gameState: {
				currentPlayer: 'O'
			}
		};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Change current player to X if it is O', () => {
		const initialState = {
			gameState: {
				currentPlayer: 'O'
			}
		};
		const action = {
			type: CHANGE_CURRENT_PLAYER
		};
		const expectedState = {
			gameState: {
				currentPlayer: 'X'
			}
		};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('Changes the cpu move to false if the game is over', () => {
		const initialState = {
			gameState: {
				isComputerMove: true
			}
		};
		const action = {
			type: SET_GAME_OVER,
			payload: {
				winner: 'X',
				location: undefined
			}
		};
		const expectedState = false;

		const updatedState = rootReducer(initialState, action);
		expect(updatedState.gameState.isComputerMove).toStrictEqual(expectedState);
	})
	it('Sets the computer move when one is passed in', () => {
		const initialState = false;
		const action = {
			type: SET_COMPUTER_MOVE,
			payload: {
				isComputerMove: true
			}
		};
		const expectedState = true;

		const updatedState = rootReducer(initialState, action);
		expect(updatedState.gameState.isComputerMove).toStrictEqual(expectedState);


	})
	it('Change game order if one is selected', () => {
		const initialState = {
			gameState: {
				gameOrder: 'H'
			}
		};
		const action = {
			type: CHANGE_GAME_ORDER,
			payload: {
				gameOrder: 'C'
			}
		};
		const expectedState = {
			gameState: {
				gameOrder: 'C'
			}
		};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('The hamburger menu is toggled when a new isOpenStatus is given', () => {
		const initialState = {hamburgerMenuHiddenCls: ' hidden'};

		const action = {
			type: TOGGLE_HAMBURGER_MENU,
			payload: {
				hamburgerMenuHiddenCls: ""
			}
		};

		const expectedState = {
			hamburgerMenuHiddenCls: ""
		}

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('isAIActive is toggled when the status is updated', () => {
		const initialState = {
			gameState: {
				isAIActive: false
			}
		};

		const action = {
			type: TOGGLE_AI_ACTIVE,
			payload: {
				isAIActive: true
			}
		};

		const expectedState = {
			gameState: {
				isAIActive: true
			}
		}

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('isSessionSaved is toggled when the status is updated', () => {
		const initialState = {isSessionSaved: true};

		const action = {
			type: TOGGLE_SAVE_SESSION,
			payload: {
				isSessionSaved: false
			}
		};

		const expectedState = {
			isSessionSaved: false
		};

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState);
	})
	it('resetScore clears the games', () => {
		const initialState = {games: [1, -0, 1]};
		const action = {
			type: RESET_SCORE
		};

		const expectedState = {games: []};

		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState)

	})
	it('setErrors adds the errors to the state', () => {
		const initialState = {errors: {}};
		const action = {
			type: SET_ERRORS,
			payload: {first_name: 'Fred', last_name: 'Jack'}
		};

		const expectedState = {first_name: 'Fred', last_name: 'Jack'}
		const updatedState = rootReducer(initialState, action);
		expect(updatedState.errors).toStrictEqual(expectedState)
	})
	it('setLoading updates isLoading on the state', () => {
		const initialState = {isLoading: false};
		const action = {
			type: SET_LOADING,
			payload: true
		};

		const expectedState = {isLoading: true};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState)
	})
	it('setUser places add the user to the state', () => {
		const initialState = {currentUser: {}};
		const action = {
			type: SET_USER,
			payload: {id: 1, name: 'Fred'}
		};

		const expectedState = {currentUser: {id: 1, name: 'Fred'}};
		const updatedState = rootReducer(initialState, action);
		expect(updatedState).toStrictEqual(expectedState)
	})
})
