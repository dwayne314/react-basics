// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Home from './Home';

// Test Dependencies
import { createMockStore } from '../../test-utils';

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
	});
	
	it('renders the login container', () => {
		const homeTitle = wrapper.getByTestId('home-title');
		expect(homeTitle.innerHTML).toBe("Human vs Computer");
	})
	it('changes the game mode and clears the board when the button is clicked.', () => {
		
		const humanMode = wrapper.getByTestId("game-mode-human");
		expect(JSON.stringify(store.getActions())).toBe("[]");
		act(() => {
			fireEvent.click(humanMode);
		});
		const expectedAction = JSON.stringify([ {type: 'CLEAR_BOARD'}, { type: 'CHANGE_GAME_MODE', payload: { gameMode: 1 } } ]);
		const storeAction = JSON.stringify(store.getActions());
		expect(storeAction).toBe(expectedAction);
	})

})
