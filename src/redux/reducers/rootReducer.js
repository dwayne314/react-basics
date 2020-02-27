import { GAME_OVER, CHANGE_GAME_MODE } from '../actions/actions';


const initialState = {
	games: [],
	gameState: {
		gameOrder: 'A',
		gameMode: 0
	}
}

export const rootReducer = (state=initialState, action) => {
	switch (action.type) {
		case GAME_OVER:
			const { status } = action.payload;
			return {
				...state,
				games: [...state.games, status]
			}
		case CHANGE_GAME_MODE:
			const { gameMode } = action.payload;
			return {
				...state,
				gameState: Object.assign({}, state.gameState, {gameMode: gameMode})
			}
		default:
			return state
	}
}