// Utility Dependencies
import {
	changeGameMode, 
	changeCurrentPlayer,
	createGameOver,
	changeHumanIcon,
	CHANGE_GAME_MODE,
	CHANGE_CURRENT_PLAYER,
	GAME_OVER,
	CHANGE_HUMAN_ICON
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
	it('createGameOver returns a 0 status if X or O is not the userIcon', () => {
		const userIcon =  'Y';
		const action = {
			type: GAME_OVER,
			payload: {
				status: 0
			}
		};
		expect(createGameOver(userIcon)).toEqual(action);
	})
	it('changeHumanIcon returns the correct action', () => {
		const action =  {
			type: CHANGE_HUMAN_ICON,
		};
		expect(changeHumanIcon()).toEqual(action);
	})
})