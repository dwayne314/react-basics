// Library Dependencies
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Game from './Game';

// Test Dependencies
import { createMockStore } from '../../test-utils';

// Mock Dependencies
import * as Utils from '../../utils/TicTacToe/TicTacToe';
import * as Actions from '../../redux/actions/actions';


const randomCpuMoveSpy = jest.spyOn(Utils, 'makeRandomComputerMove');
const checkGameOverSpy = jest.spyOn(Utils, 'checkGameOver');
const changeIconSpy = jest.spyOn(Actions, 'changeHumanIcon');
const windowAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.useFakeTimers();


describe('Game', () => {
	let wrapper;
	let store;
	let initialState;

	beforeEach(() => {
		initialState = {
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
		};
		store = createMockStore([], initialState);

		wrapper = render(
			<Provider store={store}>
				<Game mode={0} firstMove='human'/>
			</Provider>);
	});

	afterEach(() => {
		randomCpuMoveSpy.mockClear();
		windowAlert.mockClear();
		checkGameOverSpy.mockClear();
		changeIconSpy.mockClear();
		store.clearActions();
	})
	it('renders 3 rows for the game', () => {
		const game = wrapper.getByTestId('game').children;
		expect(game.length).toBe(3);
	})
	it('After the human moves, the computer moves if the mode is 1.', () => {
		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1})
		act(() => {
			fireEvent.click(positionOne);
			jest.runAllTimers();

		});

		expect(store.getActions()).toStrictEqual(
			[
				{
					type: 'MAKE_MOVE', payload: {
						location: {
							x: 0,
							y: 0,
						},
						icon: 'X'
					}
				},
				{
					type: 'MAKE_MOVE',
					payload: {
						location: {
							x: 0,
							y: 1,
							},
							icon: 'O'
						}
					}
				]
			);
	})
	it('If the game is over the GAME_OVER action with a winner the status is dispatched', () => {
		const { humanIcon } = store.getState().gameState;

		checkGameOverSpy
			.mockReturnValueOnce({winner: humanIcon, location:[]});

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy
		    .mockReturnValueOnce({x: 0, y: 1});
		act(() => {
			fireEvent.click(positionOne);
		 	jest.runAllTimers();

		});

		expect(store.getActions()[1]).toStrictEqual({ type: 'GAME_OVER', payload: { status: 1 } });
		expect(windowAlert).toHaveBeenCalledTimes(1);
		expect(windowAlert).toHaveBeenCalledWith('X');
	})
	it('If the game is over the GAME_OVER action with a tie status is dispatched if the winner is undefined', () => {
		checkGameOverSpy
			.mockReturnValueOnce({winner: undefined});

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1});
		act(() => {
			fireEvent.click(positionOne);
		 	jest.runAllTimers();

		});

		expect(store.getActions()[1]).toStrictEqual({ type: 'GAME_OVER', payload: { status: 0 } });
		expect(windowAlert).toHaveBeenCalledTimes(1);
		expect(windowAlert).toHaveBeenCalledWith('its a tie');
	})
	it('The mergeboard function will highlight the winning squares if the human won', () => {
		const { cpuIcon } = store.getState().gameState;

		checkGameOverSpy
			.mockReturnValueOnce({winner: 'X', location:[
					{x: 0, y: 0},
					{x: 0, y: 1},
					{x: 0, y: 2}
				]});

		const positionOne = wrapper.getByTestId('col-1').children[0];
		const positionTwo = wrapper.getByTestId('col-1').children[1];
		const positionThree = wrapper.getByTestId('col-1').children[2];

		act(() => {
			fireEvent.click(positionOne);

		});

		expect(positionOne.classList.contains('winner')).toBe(true);
		expect(positionTwo.classList.contains('winner')).toBe(true);
		expect(positionThree.classList.contains('winner')).toBe(true);
	})
	it('The mergeboard function will highlight the losing squares if the cpu won', () => {
		const { cpuIcon } = store.getState().gameState;
		checkGameOverSpy
			.mockReturnValueOnce({winner: cpuIcon, location:[
					{x: 0, y: 0},
					{x: 0, y: 1},
					{x: 0, y: 2}
				]});

		const positionOne = wrapper.getByTestId('col-1').children[0];
		const positionTwo = wrapper.getByTestId('col-1').children[1];
		const positionThree = wrapper.getByTestId('col-1').children[2];

		act(() => {
			fireEvent.click(positionOne);

		});

		expect(positionOne.classList.contains('loser')).toBe(true);
		expect(positionTwo.classList.contains('loser')).toBe(true);
		expect(positionThree.classList.contains('loser')).toBe(true);
	})


})
describe('Game', () => {
	let wrapper;
	let store;
	let initialState;

	beforeEach(() => {
		initialState = {
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
		};
		store = createMockStore([], initialState);

	});

	afterEach(() => {
		randomCpuMoveSpy.mockClear();
		windowAlert.mockClear();
		store.clearActions();
	})

	it('The changeHumanIcon function is called after each move if the the mode is 1', () => {

		wrapper = render(
			<Provider store={store}>
				<Game mode={1} firstMove='human'/>
			</Provider>);


		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		act(() => {
			fireEvent.click(positionOne);

		});

		expect(changeIconSpy).toHaveBeenCalledTimes(1);

	})
	it('The changeHumanIcon function is called after each move if the the mode is 1', () => {

		wrapper = render(
			<Provider store={store}>
				<Game mode={1} firstMove='cpu'/>
			</Provider>);


		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		act(() => {
			fireEvent.click(positionOne);

		});

		expect(changeIconSpy).toHaveBeenCalledTimes(1);
	})
	it('The mergeboard function will highlight the losing squares if the cpu icon won but the mode is 1', () => {
		const { cpuIcon } = store.getState().gameState;
		wrapper = render(
			<Provider store={store}>
				<Game mode={1} firstMove='human'/>
			</Provider>)

		checkGameOverSpy
			.mockReturnValueOnce({winner: cpuIcon, location:[
					{x: 0, y: 0},
					{x: 0, y: 1},
					{x: 0, y: 2}
				]});

		const positionOne = wrapper.getByTestId('col-1').children[0];
		const positionTwo = wrapper.getByTestId('col-1').children[1];
		const positionThree = wrapper.getByTestId('col-1').children[2];

		act(() => {
			fireEvent.click(positionOne);

		});

		expect(positionOne.classList.contains('winner')).toBe(true);
		expect(positionTwo.classList.contains('winner')).toBe(true);
		expect(positionThree.classList.contains('winner')).toBe(true);
	})
	it('A human click is not registered if the square is occupied', () => {
		const board = [
					[['X'], ['O'], []],
					[[], [], []],
					[[], [], []]
				];
		store = createMockStore([], Object.assign({}, initialState, {
			...initialState,
			gameState: {
				...initialState.gameState,
				currentBoard: board
			}
		}));
		wrapper = render(
			<Provider store={store}>
				<Game mode={1} firstMove='human'/>
			</Provider>);

		const positionOne = wrapper.getByTestId('col-1').children[0];

		act(() => {
			fireEvent.click(positionOne);
		});
		const visibleBoard = wrapper.getAllByTestId('position-text')
			.map(position => position.innerHTML);
		expect(visibleBoard).toStrictEqual(["X", "O", "", "", "", "", "", "", ""]);
	})
})