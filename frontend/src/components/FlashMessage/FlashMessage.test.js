import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import FlashMessage from './FlashMessage';

// Test Dependencies
import { createMockStore } from '../../test-utils';
import * as selectors from '../../redux/selectors/selectors';

describe('Flash Messages', () => {

	let wrapper;
	let store;
	let initialState;
	const getFlashMessagesMock = jest.spyOn(selectors, 'getFlashMessage');

	beforeEach(() => {
		initialState = {
			flashMessage: {
				message: 'I\'m a message from the state',
				severity: 1
			}
		};
	})

	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();

	})

	it('shows the rgb(128, 210, 80) background color it the severity is 1', () => {
		initialState = {
			flashMessage: {
				message: 'I\'m a message from the state',
				severity: 1
			}
		}
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<FlashMessage />
			</Provider>);

		const flashMessage = wrapper.getByTestId('flash-message');
		expect(flashMessage.style._values['background-color']).toBe('rgb(128, 210, 80)')
	})
	it('shows the rgb(128, 210, 80) background color it the severity is 1', () => {
		getFlashMessagesMock.mockReturnValue({message: undefined, severity: 1})
		initialState = {
			flashMessage: {
				message: undefined,
				severity: 1
			}
		}
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<FlashMessage />
			</Provider>);

		expect(wrapper.container.firstChild).toBe(null)
	})
})
