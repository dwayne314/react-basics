// Library Dependencies
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

// App Dependencies
import Header from './Header';

// Utilities
import { wrapRouter } from '../../test-utils.js';


describe('Header', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<Header />, {wrapper: MemoryRouter});
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

})