// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// App Dependencies
import Signup from './Signup';
import validate from '../../validators/auth';
import * as authActions from '../../redux/actions/auth';
import * as selectors from '../../redux/selectors/selectors'

// Test Dependencies
import { createMockStore } from '../../test-utils';

// Mock Dependencies
import * as ReactReduxHooks from 'react-redux';


describe('Signup', () => {

	describe('Signup without errors', () => {

		let wrapper;
		let store;
		let initialState;
		let dispatchMock;
	
		const validateSignupMock = jest.spyOn(validate, 'registration')
		const registerUserMock = jest.spyOn(authActions, 'registerUser')
		const historyMock = {push: jest.fn(), goBack: jest.fn()}

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
				errors: {}
			};
			store = createMockStore([], initialState);
	
			dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
				.mockImplementation(() => store.dispatch);
	
				wrapper = render(
					<Provider store={store}>
						<Signup history={historyMock}/>
					</Provider>, {wrapper: MemoryRouter});
		});
		afterEach(() => {
			jest.resetAllMocks();
			store.clearActions();
		});
	
		it('renders the signup container', () => {
			const signup = wrapper.getByTestId('signup-container');
			expect(signup.innerHTML).toBeTruthy();
		})
		it('updates the first_name field if something is typed', () => {
			const firstNameInput = wrapper.getByTestId('firstName-input');
			const firstNameInputValue = 'Frank';
			fireEvent.change(firstNameInput, { target: { value: firstNameInputValue}});
			
			expect(firstNameInput.value).toBe(firstNameInputValue);
		})
		it('updates the last_name field if something is typed', () => {
			const lastNameInput = wrapper.getByTestId('lastName-input');
			const lastNameInputValue = 'Johns';
			fireEvent.change(lastNameInput, { target: { value: lastNameInputValue}});
			
			expect(lastNameInput.value).toBe(lastNameInputValue);
		})
		it('updates the username field if something is typed', () => {
			const usernameInput = wrapper.getByTestId('username-input');
			const usernameInputValue = 'username1';
			fireEvent.change(usernameInput, { target: { value: usernameInputValue}});
			
			expect(usernameInput.value).toBe(usernameInputValue);
		})
		it('updates the password field if something is typed', () => {
			const passwordInput = wrapper.getByTestId('password-input');
			const passwordInputValue = 'password1';
			fireEvent.change(passwordInput, { target: { value: passwordInputValue}});
			
			expect(passwordInput.value).toBe(passwordInputValue);
		})
		it('dispatches errors when submit is clicked and the form is not valid', () => {
			validateSignupMock.mockReturnValueOnce({isValid: false, errors: 'error'})
			const submitBtn = wrapper.getByTestId('submit-button');
			fireEvent.click(submitBtn);

			expect(store.getActions().filter(action => action.type = 'SET_ERROR')[0].payload).toStrictEqual({})
			expect(store.getActions().filter(action => action.type = 'SET_ERROR')[1].payload).toBe('error');
		})
		it('dispatches registration when submit is clicked and the form is not valid', () => {
			validateSignupMock.mockReturnValueOnce({isValid: true});
			registerUserMock.mockReturnValueOnce({type: 'REGISTER_MOCK', payload: ''});
			const submitBtn = wrapper.getByTestId('submit-button');
			fireEvent.click(submitBtn);

			expect(store.getActions().filter(action => action.type === 'REGISTER_MOCK').length).toBe(1);
		})
		it('does not render any errors', () => {
			const firstNameError = wrapper.queryByTestId('first-name-error');
			const lastNameError = wrapper.queryByTestId('last-name-error');
			const usernameError = wrapper.queryByTestId('username-error');
			const passwordError = wrapper.queryByTestId('password-error');

			expect(firstNameError).toBeFalsy();
			expect(lastNameError).toBeFalsy();
			expect(usernameError).toBeFalsy();
			expect(passwordError).toBeFalsy();

		})
	})
	describe('Signup with errors', () => {

		let wrapper;
		let store;
		let initialState;
		let dispatchMock;
	
		const validateSignupMock = jest.spyOn(validate, 'registration')
		const registerUserMock = jest.spyOn(authActions, 'registerUser')
	
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
				errors: {first_name: 'Fred', last_name: 'Jh', username: 'usrerrr', password: 'juntres'}
			};
			store = createMockStore([], initialState);
	
			dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
				.mockImplementation(() => store.dispatch);
	
				wrapper = render(
					<Provider store={store}>
						<Signup />
					</Provider>);
		});
		afterEach(() => {
			jest.resetAllMocks();
			store.clearActions();
		});
	
		it('renders the errors on the page', () => {
			const firstNameError = wrapper.getByTestId('first-name-error')
			const lastNameError = wrapper.getByTestId('last-name-error')
			const usernameError = wrapper.getByTestId('username-error')
			const passwordError = wrapper.getByTestId('password-error')

			expect(firstNameError.classList.contains('form-error')).toBeTruthy();
			expect(lastNameError.classList.contains('form-error')).toBeTruthy();
			expect(usernameError.classList.contains('form-error')).toBeTruthy();
			expect(passwordError.classList.contains('form-error')).toBeTruthy();
		})
	})
})
