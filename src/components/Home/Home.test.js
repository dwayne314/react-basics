import React from 'react';
import { render } from '@testing-library/react';

import Home from './Home';



describe('Home', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<Home />)
	})
	it('renders the login container', () => {
		const homeTitle = wrapper.getByTestId('home-title')
		expect(homeTitle.innerHTML).toBe("Human vs Computer")
	})
})