// Library Dependencies
import React from 'react';
import { render } from '@testing-library/react';
import * as ReactReduxHooks from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Test Dependencies
import { createMockStore } from '../../test-utils';

// Mock Dependencies
import * as selectors from '../../redux/selectors/selectors';
import * as authActions from '../../redux/actions/auth';
import * as utils from '../../utils/utils';

// App Dependencies
import Logout from './Logout';


describe('Logout', () => {
	let wrapper;
	let store;
	let initialState;
	let dispatchMock;
	let historyMock;

	const getCurrentUserMock = jest.spyOn(selectors, 'getCurrentUser');
	const isEmptyMock = jest.spyOn(utils, 'isEmpty')
		
	const logoutUserMock = jest.spyOn(authActions, 'logoutUser')
		.mockImplementationOnce(() => {type: 'e'})

	beforeEach(() => {
		jest.resetAllMocks();

	})
	it('The user is redirected to home if someone is logged in', () => {
		historyMock = {push: jest.fn(), goBack: jest.fn()}		
		getCurrentUserMock.mockReturnValueOnce({id: 1});
		const initialState = { currentUser: {id: 1} };
		store = createMockStore([], initialState);

		dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
			.mockImplementation(() => () => {});

		wrapper = render(
			<Provider store={store}>
				<Logout history={historyMock} />
			</Provider>);
		expect(historyMock.push).toHaveBeenCalledWith('/')
	})
	it('The user is redirected to to their last location if someone is not logged in', () => {
		historyMock = {push: jest.fn(), goBack: jest.fn()};
		isEmptyMock.mockImplementationOnce((getCurrentUserMock) => true);
		getCurrentUserMock.mockReturnValueOnce({});

		const initialState = { currentUser: {} };
		store = createMockStore([], initialState);

		dispatchMock = jest.spyOn(ReactReduxHooks, 'useDispatch')
			.mockImplementation(() => () => {});

		wrapper = render(
			<Provider store={store}>
				<Logout history={historyMock} />
			</Provider>);
		expect(historyMock.push).toHaveBeenCalledWith('/');
	})
})