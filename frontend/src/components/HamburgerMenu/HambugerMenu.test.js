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
	let initialState = {
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
		},
		currentUser: {}
	};
	let store;
	let map;

	beforeEach(() => {
		jest.useFakeTimers();
		map = {};
		document.addEventListener = jest.fn((event, cb) => {
		  map[event] = cb;
		});
		document.removeEventListener = jest.fn((event, cb) => {
		  map[event] = undefined;
		});

	});
	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();
	})
	it('gets a hidden class when the hamburger tray is not open', () => {
		hamburgerMenuHiddenClsSpy.mockReturnValue(' hidden');
		store = createMockStore([], initialState);

		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const hamburgerTray = wrapper.getByTestId('hamburger-menu');
		expect(hamburgerTray.classList.contains('hidden')).toBe(true);

	})
	it('does not have a hidden class when the hamburger tray is open', () => {
		hamburgerMenuHiddenClsSpy.mockReturnValue('');
		store = createMockStore([], initialState);

		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const hamburgerTray = wrapper.getByTestId('hamburger-menu');
		expect(hamburgerTray.classList.contains('hidden')).toBe(false);
	})
	it('does not show login when the user is logged in only logout', () => {
		store = createMockStore([], Object.assign({}, {
			...initialState,
			currentUser: {id: 1}}));
		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const loginLink = wrapper.queryByTestId('login');
		const logoutLink = wrapper.queryByTestId('logout');
		expect(loginLink).toBeFalsy();
		expect(logoutLink).toBeTruthy();
	})
	it('does not show logout when the user is logged out login', () => {
		store = createMockStore([], Object.assign({}, {
			...initialState,
			currentUser: {}}));
		wrapper = render(
			<Provider store={store}>
				<HamburgerMenu />
			</Provider>, {wrapper: MemoryRouter});

		const loginLink = wrapper.queryByTestId('login');
		const logoutLink = wrapper.queryByTestId('logout');
		expect(loginLink).toBeTruthy();
		expect(logoutLink).toBeFalsy();
	})
})





























