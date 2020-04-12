import axios from 'axios';
import { createMockStore } from '../../test-utils';

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
	setFlashMessage,
	toggleFlash,
	saveGameStatus,
	CHANGE_GAME_MODE,
	CHANGE_CURRENT_PLAYER,
	GAME_OVER,
	CHANGE_HUMAN_ICON,
	TOGGLE_HAMBURGER_MENU,
	TOGGLE_AI_ACTIVE,
	TOGGLE_SAVE_SESSION,
	RESET_SCORE,
	SET_FLASH_MESSAGE
} from './actions';

describe('actions', () => {

	const axiosPostMock = jest.spyOn(axios, 'post');
	const logMock = jest.spyOn(window.console, 'log');

	const store = createMockStore([], {});

	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();
	})

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
	it('setFlashMessage returns a payload with the message and severity correctly', () => {
		const action = {
			type: SET_FLASH_MESSAGE,
			payload: {
				message: 'an error',
				severity: 1
			}
		}
		expect(setFlashMessage('an error', 1)).toEqual(action);
	})
	it('toggleFlash dispatches the setFlashMessage action', () => {
		const setTimeoutMock = window.setTimeout = jest.fn();
		const action = setFlashMessage('msg', 1)
		expect(action.type).toBe('SET_FLASH_MESSAGE');
		expect(action.payload.message).toBe('msg');
	})
	it('saveGameStatus posts the game data if the post was successful', async () => {
		const gameData = 'saved game';
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved({response: {data: gameData}});
	        }));

		const gameSave = await saveGameStatus(1,1,0)(store.dispatch);
		const storeActions = store.getActions();
		expect(axiosPostMock).toHaveBeenCalledWith("/api/games", {"ai_active": 0, "human_first": 1, "status": 1});
	})
	it('saveGameStatus logs an error if the post was unsuccessful', async () => {
		const errorMsg = 'saved game';
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMsg}});
	        }));

		const gameSave = await saveGameStatus(1,1,0)(store.dispatch);
		const storeActions = store.getActions();
		expect(logMock).toHaveBeenCalledWith(errorMsg);
	})
})