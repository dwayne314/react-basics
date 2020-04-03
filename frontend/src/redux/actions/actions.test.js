// Utility Dependencies
import {
	changeGameMode, 
	changeCurrentPlayer,
	createGameOver,
	changeHumanIcon,
	toggleHamburgerMenu,
	toggleAIActive,
	toggleSaveSession,
	resetScore,
	CHANGE_GAME_MODE,
	CHANGE_CURRENT_PLAYER,
	GAME_OVER,
	CHANGE_HUMAN_ICON,
	TOGGLE_HAMBURGER_MENU,
	TOGGLE_AI_ACTIVE,
	TOGGLE_SAVE_SESSION,
	RESET_SCORE
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
	it('toggleHamburgerMenu returns an empty class if the the current menu is open', () => {
		const action = {
			type: TOGGLE_HAMBURGER_MENU,
			payload: {
				hamburgerMenuHiddenCls: ''
			}
		};
		expect(toggleHamburgerMenu(" hidden")).toEqual(action);
	})
	it('toggleHamburgerMenu returns an hidden class if the the current menu is open', () => {
		const action = {
			type: TOGGLE_HAMBURGER_MENU,
			payload: {
				hamburgerMenuHiddenCls: ' hidden'
			}
		};
		expect(toggleHamburgerMenu("")).toEqual(action);
	})
	it('toggleSaveSession returns a payload with the indicated save session state', () => {
		const action = {
			type: TOGGLE_SAVE_SESSION,
			payload: {
				isSessionSaved: true
			}
		};
		expect(toggleSaveSession(true)).toEqual(action);
	})
	it('resetScore', () => {
		const action = {
			type: RESET_SCORE
		}
		expect(resetScore()).toEqual(action);
	})
})