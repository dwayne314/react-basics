// Library Dependencies
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Header from './Header';

// Test Dependencies
import { createMockStore } from '../../test-utils';

//Mock Dependencies
import * as Selectors from '../../redux/selectors/selectors';
import * as Actions from '../../redux/actions/actions';


const toggleHamburgerMenuSpy = jest.spyOn(Actions, 'toggleHamburgerMenu');

describe('Header', () => {
	let wrapper;
	let initialState;
	let store;

	beforeEach(() => {
		jest.useFakeTimers();

		initialState = {
			isHamburgerTrayOpen:false,
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

		wrapper = render(
			<Provider store={store}>
				<Header />
			</Provider>, {wrapper: MemoryRouter});
	});
	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();
	})

	it('renders a title', () => {
		const title = wrapper.getByTestId('title').firstChild;
		expect(title.innerHTML).toBe('Tic-Tac-Toe');
	})
	it('renders a Login Link', () => {
		const title = wrapper.getByTestId('login');
		expect(title.innerHTML).toBe('Login');
	})
	it('renders a Settings Link', () => {
		const title = wrapper.getByTestId('settings');
		expect(title.innerHTML).toBe('Settings');
	})
	it('Toggles the hamburger menu when the icon is clicked', () => {
		const action = {
			type: Actions.TOGGLE_HAMBURGER_MENU,
			payload: {
				ismenuOpen: true
			}
		};

		toggleHamburgerMenuSpy.mockReturnValue(action);
		const hamburgerMneuIcon = wrapper.getByTestId('hamburger-menu-icon');

		act(() => {
			fireEvent.click(hamburgerMneuIcon);
		});
		expect(store.getActions()[0]).toStrictEqual({type: 'TOGGLE_HAMBURGER_MENU', payload: {ismenuOpen: true}});

	})

})