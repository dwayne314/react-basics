import { GAME_OVER } from '../actions/actions';


const initialState = {
	games: []
}

export const rootReducer = (state=initialState, action) => {
	switch (action.type) {
		case GAME_OVER:
			const { status } = action.payload;
			return {
				...state,
				games: [...state.games, status]
			}
		default:
			return state
	}
}