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

	describe('with a logged in user', () => {
		beforeEach(() => {
			jest.useFakeTimers();

			initialState = {
				currentUser: {}
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
			const title = wrapper.getByTestId('title-header').firstChild;
			expect(title.innerHTML).toBe('Tic-Tac-Toe');
		})
		it('renders a Login Link', () => {
			const title = wrapper.getByTestId('login-header');
			expect(title.innerHTML).toBe('Login');
		})
		it('renders a Settings Link', () => {
			const title = wrapper.getByTestId('settings-header');
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
	describe('with a logged out user',() => {
		let wrapper;
		let initialState;
		let store;

		beforeEach(() => {
			jest.useFakeTimers();

			initialState = {
				currentUser: {id: 1}
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
		it('', () => {

			const loginLink = wrapper.queryByTestId('login-header');
			const logoutLink = wrapper.queryByTestId('logout-header');
			expect(loginLink).toBeFalsy();
			expect(logoutLink).toBeTruthy();
		})
	})
})


