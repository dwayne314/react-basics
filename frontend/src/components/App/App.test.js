// Library Dependencies
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// Test Dependencies
import { createMockStore } from '../../test-utils';
import * as selectors from '../../redux/selectors/selectors';
import * as actions from '../../redux/actions/actions';


// App Dependencies
import App from './App';


describe('App', () => {
	let wrapper;
	let store;
	let initialState = {
		games: [],
		hamburgerMenuHiddenCls: ' hidden',
		isSessionSaved: true,
		gameState: {
			isAIActive: false,
			isComputerMove: false,
			lastFirstMove: 1,
			isGameOver: false,
			gameOrder: 'H',
			gameMode: 0,
			currentPlayer: 'X',
			humanIcon: 'X',
			cpuIcon: 'O',
			currentBoard: [
				[[], [], []],
				[[], [], []],
				[[], [], []]
			]
		},
		errors: {},
		isLoading: false,
		currentUser: {},
		flashMessage: {
			message: 'I\'m a message from the state',
			severity: 1
		}
	}
	const hamburgerMenuHiddenClsMock = jest.spyOn(selectors, 'hamburgerMenuHiddenCls');
	const toggleFlashMock = jest.spyOn(actions, 'toggleFlash')
		// .mockReturnValueOnce({type: 'f', payload: []})

		afterEach(() => {
			jest.resetAllMocks();
		})


	it('renders the app', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<App />
			</Provider>, {wrapper: MemoryRouter});
		expect(wrapper).toBeTruthy();
	})
	it('toggles the hamburger menu if the page changes and the hidden class !== \'\'', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<App />
			</Provider>, {wrapper: MemoryRouter});

		const actions = store.getActions().filter(action => action.type === 'TOGGLE_HAMBURGER_MENU');
		expect(actions[0].payload.hamburgerMenuHiddenCls).toBe(' hidden');
		expect(actions.length).toBe(1)

	})
	it('toggles the hamburger menu if the page changes and the hidden class === \'\'', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		store = createMockStore([], initialState);
		wrapper = render(
			<Provider store={store}>
				<App />
			</Provider>, {wrapper: MemoryRouter});
		
		const action = store.getActions().find(action => action.type === 'TOGGLE_HAMBURGER_MENU');
		expect(action.payload.hamburgerMenuHiddenCls).toBe(' hidden');

	})
})