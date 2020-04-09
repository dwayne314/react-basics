// Library Dependencies
import React from 'react';
import { render } from '@testing-library/react';
import * as ReactReduxHooks from 'react-redux';
import { Provider } from 'react-redux';

// Test Dependencies
import { createMockStore } from '../../test-utils';

// App Dependencies
import LoggedInBanner from './LoggedInBanner';





describe('LoggedInBanner', () => {
	let store;
	let wrapper;
	const useSelectorMock = jest.spyOn(ReactReduxHooks, 'useSelector');

	afterEach(() => {
		jest.resetAllMocks();
	})
	it('returns nothing if there is no current user', () => {
		useSelectorMock.mockReturnValueOnce({})
		const initialState = {
			currentUser: {}
		};
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<LoggedInBanner />
			</Provider>);
		const loggedInBanner = wrapper.queryByTestId('logged-in-banner');
		expect(loggedInBanner).toBeFalsy();
	})
	it('returns nothing if there is no current user', () => {
		useSelectorMock.mockReturnValueOnce({id: 9})		
		const initialState = {
			currentUser: {id: 9}
		};
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<LoggedInBanner />
			</Provider>);
		const loggedInBanner = wrapper.queryByTestId('logged-in-banner');
		expect(loggedInBanner).toBeTruthy();
	})
})