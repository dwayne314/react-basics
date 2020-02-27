import { rootReducer } from './rootReducer';
import { CHANGE_GAME_MODE } from '../actions/actions';


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


		const modifiedAction = JSON.stringify({
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 1
			}
		});

		const updatedState = JSON.stringify(rootReducer(initialState, action));
		expect(updatedState).toBe(modifiedAction);
	})
})