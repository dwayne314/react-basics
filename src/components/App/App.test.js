import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from './App';


describe('App', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<App />, {wrapper: MemoryRouter})
	})
	it('renders the app', () => {
		expect(wrapper).toBeTruthy()
	})
})