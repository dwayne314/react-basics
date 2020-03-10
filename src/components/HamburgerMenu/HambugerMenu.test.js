// Library Dependencies
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import HamburgerMenu from './HamburgerMenu';

// Test Dependencies
import { createMockStore } from '../../test-utils';

//Mock Dependencies
import * as Selectors from '../../redux/selectors/selectors';
import * as Actions from '../../redux/actions/actions';


const hamburgerMenuHiddenClsSpy = jest.spyOn(Selectors, 'hamburgerMenuHiddenCls');
const toggleHamburgerMenuSpy = jest.spyOn(Actions, 'toggleHamburgerMenu');

describe('HamburgerMenu', () => {
	let wrapper;
	let initialState;
	let store;

	beforeEach(() => {
		jest.useFakeTimers();

		initialState = {
			hamburgerMenuHiddenCls: '',
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

	});
	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();
	})
	it('The hamburger menu gets a hidden class when the hamburger tray is not open', () => {
		hamburgerMenuHiddenClsSpy.mockReturnValue(' hidden');

		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const hamburgerTray = wrapper.getByTestId('hamburger-menu');
		expect(hamburgerTray.classList.contains('hidden')).toBe(true);

	})
	it('The hamburger menu does not have a hidden class when the hamburger tray is open', () => {
		hamburgerMenuHiddenClsSpy.mockReturnValue('');

		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const hamburgerTray = wrapper.getByTestId('hamburger-menu');
		expect(hamburgerTray.classList.contains('hidden')).toBe(false);

	})
})
