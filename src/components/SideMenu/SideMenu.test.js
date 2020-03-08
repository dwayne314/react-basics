// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import SideMenu from './SideMenu';

// Test Dependencies
import { createMockStore } from '../../test-utils';
import { wrapProvider } from '../../test-utils.js';

// Mock Dependencies
import * as ReactRedux from 'react-redux';


describe('SideMenu', () => {

	const mockUpdateGameMode = jest.fn();
	const mockUpdateGameOrder = jest.fn();
	const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');

	afterEach(() => {
		mockUpdateGameMode.mockReset();
		useSelectorMock.mockReset();
	});
	it('The scoreboard shows the current score.', () => {
		const wrapper = render(wrapProvider(
			<SideMenu wins={20}
				losses={7}
				ties={0}
				updateGameMode={mockUpdateGameMode}/>))

		const wins = wrapper.getByTestId("win-counter").innerHTML;
	 	const losss = wrapper.getByTestId("loss-counter").innerHTML;
	 	const ties = wrapper.getByTestId("tie-counter").innerHTML;

	 	expect(wins).toBe("20");
	 	expect(losss).toBe("7");
	 	expect(ties).toBe("0");
	})
	it('The game modes correctly updates the game mode (human clicked)', () => {
		let humanMode, cpuMode;
		const wrapper = render(wrapProvider(
			<SideMenu wins={20}
				losses={7}
				ties={0}
				mode={1}
				updateGameMode={mockUpdateGameMode}/>));

		humanMode = wrapper.getByTestId("game-mode-human");
		cpuMode = wrapper.getByTestId("game-mode-cpu");

		expect(humanMode.classList.contains('settings-box-chosen')).toBe(true);
		expect(cpuMode.classList.contains('settings-box-chosen')).toBe(false);

	})
	it('The game modes correctly updates the game mode (cpu clicked)', () => {
		let humanMode, cpuMode;
		const wrapper = render(wrapProvider(
			<SideMenu wins={20}
				losses={7}
				ties={0}
				mode={0}
				updateGameMode={mockUpdateGameMode}/>));

		humanMode = wrapper.getByTestId("game-mode-human");
		cpuMode = wrapper.getByTestId("game-mode-cpu");

		expect(humanMode.classList.contains('settings-box-chosen')).toBe(false);
		expect(cpuMode.classList.contains('settings-box-chosen')).toBe(true);

	})
	it('UpdateGameMode function is called when a game mode is clicked', () => {
		const wrapper = render(wrapProvider(
			<SideMenu wins={20}
				losses={7}
				ties={0}
				updateGameMode={mockUpdateGameMode}/>));

		const humanMode = wrapper.getByTestId("game-mode-human");
		const cpuMode = wrapper.getByTestId("game-mode-cpu");

		act(() => {
			fireEvent.click(cpuMode);
			fireEvent.click(humanMode);
		})
		expect(mockUpdateGameMode).toHaveBeenNthCalledWith(1, 0);
		expect(mockUpdateGameMode).toHaveBeenNthCalledWith(2, 1);

	})
	it('The board is cleared when the new game button is clicked', () => {
		const initialState = {
			games: [],
			gameState: {
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
		}
		const store = createMockStore([], initialState);

		const wrapper = render(
			<Provider store={store}>
				<SideMenu wins={20}
					losses={7}
					ties={0}
					updateGameMode={mockUpdateGameMode}/>
			</Provider>);

		const startGame = wrapper.getByTestId("start-new-game");

		act(() => {
			fireEvent.click(startGame);
		})
		expect(store.getActions()[0]).toStrictEqual({
			type: 'CLEAR_BOARD'
		})

	})
	it('The game order container gets the clicked class when the correct order is specified.', () => {
		const initialState = {
			games: [],
			gameState: {
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
		}
		const store = createMockStore([], initialState);

		const wrapper = render(
			<Provider store={store}>
				<SideMenu wins={20}
					losses={7}
					ties={0}
					updateGameMode={mockUpdateGameMode}
					updateGameOrder={mockUpdateGameOrder}
					gameOrder='C'/>
			</Provider>);
		const cpuFirst = wrapper.getByTestId("game-order-cpu");
		expect(cpuFirst.classList.contains("settings-box-chosen"))
	})
})
