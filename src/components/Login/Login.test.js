import React from 'react';
import { render } from '@testing-library/react';

import Login from './Login';



describe('Login', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<Login />)
	})
	it('renders the login container', () => {
		const login = wrapper.getByTestId('login-container')
		expect(login.innerHTML).toBe("")
	})
})