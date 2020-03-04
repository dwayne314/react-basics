// Library Dependencies
import React from 'react';
import { render } from '@testing-library/react';

// App Dependencies
import Settings from './Settings';


describe('Settings', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<Settings />);
	})
	it('renders the settings title', () => {
		const settings = wrapper.getByTestId('settings-container');
		expect(settings.innerHTML).toBe("");
	})
})
