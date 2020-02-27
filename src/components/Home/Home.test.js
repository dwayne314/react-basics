import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../test-utils';
import { initialState } from '../../redux/reducers/rootReducer';

import Home from './Home';




describe('Home', () => {
	let wrapper;
	let store;

	beforeEach(() => {
		const initialState = {
			games: [],
			gameState: {
				gameOrder: 'A',
				gameMode: 0
			}
		}
		store = createMockStore([], initialState)

		jest
			.spyOn(ReactReduxHooks, "useDispatch")
			.mockImplementation(() => store.dispatch);
			wrapper = render(
				<Provider store={store}>
					<Home />
				</Provider>)
	})
	afterEach(() => {
		store.clearActions()

	})
	
	it('renders the login container', () => {
		const homeTitle = wrapper.getByTestId('home-title')
		expect(homeTitle.innerHTML).toBe("Human vs Computer")
	})
	it('changes the game mode when the button is clicked.', () => {
		
		const humanMode = wrapper.getByTestId("game-mode-human");
		expect(JSON.stringify(store.getActions())).toBe("[]")
		act(() => {
			fireEvent.click(humanMode);
		})
		const expectedAction = JSON.stringify([ { type: 'CHANGE_GAME_MODE', payload: { gameMode: 1 } } ])
		const storeAction = JSON.stringify(store.getActions())
		expect(storeAction).toBe(expectedAction)
	})

})
