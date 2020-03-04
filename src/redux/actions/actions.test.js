// Utility Dependencies
import {
	changeGameMode, 
	changeCurrentPlayer,
	CHANGE_GAME_MODE,
	CHANGE_CURRENT_PLAYER
} from './actions';


describe('actions', () => {
	it('changeGameMode returns the specified mode', () => {
		const mode = 0;
		const action =  {
			type: CHANGE_GAME_MODE,
			payload: {
				gameMode: mode
			}
		};
		expect(changeGameMode(0)).toEqual(action);
	})
	it('The function changeCurrentPlayer returns the action type', () => {
		const action = {
			type: CHANGE_CURRENT_PLAYER
		};
		expect(changeCurrentPlayer()).toEqual(action);
	})
})