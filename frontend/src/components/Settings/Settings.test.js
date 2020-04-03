// Library Dependencies
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Settings from './Settings';

// Test Dependencies
import { createMockStore } from '../../test-utils';

// Mock Dependencies
import * as Selectors from '../../redux/selectors/selectors';


const isAIActiveSpy = jest.spyOn(Selectors, 'isAIActive');
const isSessionSavedSpy = jest.spyOn(Selectors, 'isSessionSaved')

describe('Settings', () => {
	let wrapper;
	let store;
	let initialState;

	beforeEach(() => {
		jest.useFakeTimers();

		initialState = {
			games: [],
			gameState: {
				isAIActive: false,
				gameOrder: 'A',
				gameMode: 0,
				currentPlayer: 'X',
				humanIcon: 'X',
				cpuIcon: 'O',
				currentBoard: [
					[[], [], []],
					[[], [], []],
					[[], [], []]
				]
			}
		};
		store = createMockStore([], initialState);
		isAIActiveSpy.mockReturnValue(true);
		isSessionSavedSpy.mockReturnValue(false);

	});

	it('renders the settings title', () => {

		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);

		const settings = wrapper.getByTestId('settings-container');
		expect(settings.innerHTML).toBeTruthy();
	})
	it('Clicking the ai computer active button will disable isAIActive when it is activated', () => {
		isAIActiveSpy.mockReturnValue(true);
		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);

		const activeAIBtn = wrapper.getByTestId('active-ai-button');

		act(() => {
			fireEvent.click(activeAIBtn);
		});

		expect(store.getActions()[0]).toStrictEqual({type: 'TOGGLE_AI_ACTIVE', payload: {isAIActive: false}});
	})
	it('Clicking the ai computer active button will activate isAIActive when it is disabled', () => {
		isAIActiveSpy.mockReturnValue(false);
		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);

		const activeAIBtn = wrapper.getByTestId('active-ai-button');
		
		act(() => {
			fireEvent.click(activeAIBtn);
		});

		expect(store.getActions()[0]).toStrictEqual({type: 'TOGGLE_AI_ACTIVE', payload: {isAIActive: true}});
	})
	it('Clicking the record session button will activate isAIActive when it is disabled', () => {
		isSessionSavedSpy.mockReturnValue(false);
		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);
		const recordSessionBtn = wrapper.getByTestId('record-session-button');

		act(() => {
			fireEvent.click(recordSessionBtn);
		});

		expect(store.getActions()[0]).toStrictEqual({type: 'TOGGLE_SAVE_SESSION', payload: {isSessionSaved: true}});
	})
	it('Clicking the record session button will disable isAIActive when it is activated', () => {
		isSessionSavedSpy.mockReturnValue(true);
		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);

		const recordSessionBtn = wrapper.getByTestId('record-session-button');

		act(() => {
			fireEvent.click(recordSessionBtn);
		});

		expect(store.getActions()[0]).toStrictEqual({type: 'TOGGLE_SAVE_SESSION', payload: {isSessionSaved: false}});
	})
	it('Clicking the reset score button will clear the current games', () => {
		wrapper = render(
			<Provider store={store}>
				<Settings/>
			</Provider>);

		const resetScoreBtn = wrapper.getByTestId('reset-score-button');

		act(() => {
			fireEvent.click(resetScoreBtn);
		});

		expect(store.getActions()[0]).toStrictEqual({type: 'RESET_SCORE'});
	})
})
