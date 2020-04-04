// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

// App Dependencies
import Signup from './Signup';


describe('Signup', () => {
	let wrapper;
	const consoleMock = jest.spyOn(window.console, 'log');

	beforeEach(() => {
		wrapper = render(<Signup />);
	})

	afterEach(() => {
		jest.resetAllMocks();
	})
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
	it('logs when submit is clicked', () => {
		expect(consoleMock).toHaveBeenCalledTimes(0);
		const submitBtn = wrapper.getByTestId('submit-button');
		fireEvent.click(submitBtn);
		expect(consoleMock).toHaveBeenCalledTimes(1);
	})
})
