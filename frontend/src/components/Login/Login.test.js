// Library Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import validate from '../../validators/auth';
import { Provider } from 'react-redux';

// App Dependencies
import * as authActions from '../../redux/actions/auth';
import * as actions from '../../redux/actions/actions';

// Test Dependencies
import { createMockStore } from '../../test-utils';

// App Dependencies
import Login from './Login';

// Mock Dependencies
import * as ReactReduxHooks from 'react-redux';

describe('Login', () => {
	
	const validateSignupMock = jest.spyOn(validate, 'login');
	const loginMock = jest.spyOn(authActions, 'loginUser');
	const fetchGamesMock = jest.spyOn(authActions, 'fetchGames');

	describe('Login without errors',() => {
		let wrapper;
		let store;
		let initialState;
		let dispatchMock;
		let historyMock;
		const toggleFlashMock = jest.spyOn(actions, 'toggleFlash')


		beforeEach(() => {
			historyMock = {push: jest.fn(), goBack: jest.fn()}
			const initialState = {
				errors: {}
			};
			store = createMockStore([], initialState);
	
			dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
				.mockImplementation(() => store.dispatch);
	
				wrapper = render(
					<Provider store={store}>
						<Login history={historyMock}/>
					</Provider>);
		});
		afterEach(() => {
			jest.resetAllMocks();
			store.clearActions();
		});
		it('renders the login container', () => {
			const login = wrapper.getByTestId('login-container');
			expect(login.innerHTML).toBeTruthy();
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
		it('dispatches loginUser when submit is clicked and the form is valid', () => {
			loginMock.mockReturnValueOnce({
				type: 'login',
				payload: true
			})
			fetchGamesMock.mockReturnValueOnce({
				type: 'fetchGames',
				payload: true
			});
			toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});

			validateSignupMock.mockReturnValueOnce({isValid: true, result: 'user'})
			const submitBtn = wrapper.getByTestId('submit-button');
			fireEvent.click(submitBtn);

			expect(loginMock).toHaveBeenCalledWith('user')
			expect(store.getActions().find(action => action.type === 'login').payload).toBe(true)
		})
		it('redirects to home if the user is logged in', async () => {
			loginMock.mockReturnValueOnce({
				type: 'login',
				payload: true
			})
			fetchGamesMock.mockReturnValueOnce({
				type: 'fetchGames',
				payload: true
			});
			toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
			validateSignupMock.mockReturnValueOnce({isValid: true, result: 'user'})
			const submitBtn = wrapper.getByTestId('submit-button');
			fireEvent.click(submitBtn);

			expect(historyMock.push).toHaveBeenCalledWith('/')
		})
		it('does not render any errors', () => {
			const usernameError = wrapper.queryByTestId('username-error');
			const passwordError = wrapper.queryByTestId('password-error');

			expect(usernameError).toBeFalsy();
			expect(passwordError).toBeFalsy();

		})
	})
	describe('Login with errors',() => {
		let wrapper;
		let store;
		let initialState;
		let dispatchMock;
		let historyMock;
	
		

		beforeEach(() => {
			historyMock = {push: jest.fn(), goBack: jest.fn()}
			const initialState = {
				errors: {username: 'usrerrr', password: 'juntres'}
			};
			store = createMockStore([], initialState);
	
			dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
				.mockImplementation(() => store.dispatch);
	
				wrapper = render(
					<Provider store={store}>
						<Login history={historyMock}/>
					</Provider>);
		});
		afterEach(() => {
			jest.resetAllMocks();
			store.clearActions();
		});
		it('renders the errors on the page', () => {
			const usernameError = wrapper.queryByTestId('username-error');
			const passwordError = wrapper.queryByTestId('password-error');

			expect(usernameError).toBeTruthy();
			expect(passwordError).toBeTruthy();

		})
	})
	
})
