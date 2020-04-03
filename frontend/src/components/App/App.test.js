// Library Dependencies
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// App Dependencies
import App from './App';


describe('App', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<App />, {wrapper: MemoryRouter});
	})
	it('renders the app', () => {
		expect(wrapper).toBeTruthy();
	})
})