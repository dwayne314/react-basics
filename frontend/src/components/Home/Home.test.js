// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Home from './Home';

// Test Dependencies
import { createMockStore } from '../../test-utils';
import * as actions from '../../redux/actions/actions';

// Mock Dependencies
import * as ReactReduxHooks from 'react-redux';


describe('Home', () => {
	let wrapper;
	let store;

	beforeEach(() => {

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
			},
			flashMessage: {
				message: 'I\'m a message from the state',
				severity: 1
			}			
		};
		store = createMockStore([], initialState);

		jest
			.spyOn(ReactReduxHooks, "useDispatch")
			.mockImplementation(() => store.dispatch);
		wrapper = render(
			<Provider store={store}>
				<Home />
			</Provider>);
	});
	
	afterEach(() => {
		store.clearActions();
		jest.resetAllMocks();
	});
	
	it('renders the login container', () => {
		const homeTitle = wrapper.getByTestId('home-title');
		expect(homeTitle.innerHTML).toBe("Human vs Computer");
	})
	it('changes the game mode when the button is clicked.', () => {
		const humanMode = wrapper.getByTestId("game-mode-human");
		act(() => {
			fireEvent.click(humanMode);
		});

		const action = store.getActions().find(action => action.type === 'CHANGE_GAME_MODE');
		expect(action.payload.gameMode).toBe(1);
	})
	it('changes the game order to human when the human button is clicked.', () => {
		const humanFirst = wrapper.getByTestId("game-order-human");

		act(() => {
			fireEvent.click(humanFirst);

		});

		const action = store.getActions().find(action => action.type === 'CHANGE_GAME_ORDER');
		expect(action.payload.gameOrder).toBe('H');
	})
	it('changes the game order to computer when the cpu button is clicked.', () => {
		const cpuFirst = wrapper.getByTestId("game-order-cpu");

		act(() => {
			fireEvent.click(cpuFirst);
		});

		const action = store.getActions().find(action => action.type === 'CHANGE_GAME_ORDER');
		expect(action.payload.gameOrder).toBe('C');;
	})
	it('changes the game order to alternate when the alternate button is clicked.', () => {
		// toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		const alternateFirst = wrapper.getByTestId("game-order-alternate");

		act(() => {
			fireEvent.click(alternateFirst);
		});

		const action = store.getActions().find(action => action.type === 'CHANGE_GAME_ORDER');
		expect(action.payload.gameOrder).toBe('A');
	})


})
