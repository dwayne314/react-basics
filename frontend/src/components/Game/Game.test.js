// Library Dependencies
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';

// App Dependencies
import Game from './Game';

// Test Dependencies
import { createMockStore } from '../../test-utils';
import { rootReducer } from '../../redux/reducers/rootReducer';

// Mock Dependencies
import * as Utils from '../../utils/TicTacToe/TicTacToe';
import * as actions from '../../redux/actions/actions';
import * as Selectors from '../../redux/selectors/selectors';


const randomCpuMoveSpy = jest.spyOn(Utils, 'makeRandomComputerMove');
const checkGameOverSpy = jest.spyOn(Utils, 'checkGameOver');
const getPositionIconSpy = jest.spyOn(Utils, 'getPositionIcon');

const getPositionStatusClassSpy = jest.spyOn(Utils, 'getPositionStatusClass');
const changeIconSpy = jest.spyOn(actions, 'changeHumanIcon');
const isGameOverSpy = jest.spyOn(Selectors, 'isGameOver');
const isComputerMoveSpy = jest.spyOn(Selectors, 'isComputerMove');
const windowSetTimeout = jest.spyOn(window, 'setTimeout').mockImplementation(() => {});
	const toggleFlashMock = jest.spyOn(actions, 'toggleFlash')


const windowAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});



describe('Game', () => {
	let wrapper;
	let store;
	let initialState;

	beforeEach(() => {
		jest.useFakeTimers();

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
		jest.resetAllMocks();
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
		const action = store.getActions().find(action => action.type === 'SET_COMPUTER_MOVE');
		expect(action.payload.isComputerMove).toBe(true);
	})
	it('dispatches SET_GAME_OVER with a winner and location if the game is won', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});

		const { humanIcon } = store.getState().gameState;
		const location = [['X', 'X', 'X']]

		checkGameOverSpy.mockReturnValueOnce({winner: humanIcon, location:location});

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1});
		act(() => {
			fireEvent.click(positionOne);
		});
		const action = store.getActions().find(action => action.type === 'SET_GAME_OVER')
		expect(action.payload.winner).toBe('X');
		expect(action.payload.location).toStrictEqual(location);
	})
	it('dispatches SET_GAME_OVER with a winner and location if the game is tied', () => {
		checkGameOverSpy.mockReturnValueOnce({winner: undefined});
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1});

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		act(() => {
			fireEvent.click(positionOne);
		});
		const action = store.getActions().find(action => action.type === 'SET_GAME_OVER');
		expect(action.payload.location).toBe(undefined);
		expect(action.payload.winner).toBe(undefined);
		expect(windowAlert).toHaveBeenCalledTimes(1);
		expect(windowAlert).toHaveBeenCalledWith('its a tie');
	})
	it('dispatches GAME_OVER with the correct status if the game is over', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		const { humanIcon } = store.getState().gameState;

		checkGameOverSpy.mockReturnValueOnce({winner: humanIcon, location:[]});

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1});
		act(() => {
			fireEvent.click(positionOne);
		});

		const action = store.getActions().find(action => action.type === 'GAME_OVER')
		expect(action.payload.status).toBe(1);
	})
	it('The mergeboard function will highlight the winning squares if the human won', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});
		const location = [
			{x: 0, y: 0},
			{x: 0, y: 1},
			{x: 0, y: 2}]

		checkGameOverSpy.mockReturnValueOnce({winner: 'X', location:location});
		const positionOne = wrapper.getByTestId('col-1').children[0];
		act(() => {
			fireEvent.click(positionOne);
		});

		const action = store.getActions().find(action => action.type === 'SET_GAME_OVER');
		expect(action.payload.location).toStrictEqual(location)
		expect(action.payload.winner).toBe('X');
	})
	it('The mergeBoard function will highlight the losing squares if the cpu won', () => {
		toggleFlashMock.mockReturnValueOnce({type: 'f', payload: []});		
		const { cpuIcon } = store.getState().gameState;
		const location = [
			{x: 0, y: 0},
			{x: 0, y: 1},
			{x: 0, y: 2}]
		checkGameOverSpy
			.mockReturnValueOnce({winner: cpuIcon, location:location});

		const positionOne = wrapper.getByTestId('col-1').children[0];

		act(() => {
			fireEvent.click(positionOne);

		});

		const action = store.getActions().find(action => action.type === 'SET_GAME_OVER');
		expect(action.payload.location).toStrictEqual(location);
		expect(action.payload.winner).toBe('O');
	})
	it('No move is made if the position is covered', () => {
		getPositionIconSpy.mockReturnValueOnce('X');
		isComputerMoveSpy.mockReturnValue(false);
		isGameOverSpy.mockReturnValue(false);
		randomCpuMoveSpy.mockReturnValue({x: 0, y: 1});

		const positionOne = wrapper.getByTestId('col-1').children[0];

		act(() => {
			fireEvent.click(positionOne);
			jest.runAllTimers();
		});

		const action = store.getActions().find(action => action.type === 'MAKE_MOVE');
		expect(action).toBeFalsy();

	})
	it('No move is made if the position is covered and the game is over', () => {
		getPositionIconSpy.mockReturnValue('X');
		isComputerMoveSpy.mockReturnValue(true);
		isGameOverSpy.mockReturnValue(true);

		const positionOne = wrapper.getByTestId('col-1').children[0];

		act(() => {
			fireEvent.click(positionOne);
			jest.runAllTimers();

		});
		const action = store.getActions().find(action => action.type === 'MAKE_MOVE');
		expect(action).toBeFalsy();
	})
})

describe('Game', () => {
	let wrapper;
	let store;
	let initialState;

	beforeEach(() => {
		jest.useFakeTimers();

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
		jest.resetAllMocks()
		store.clearActions();
	})

	it('The computer moves if the game is not over and it\'s the cpu\'s move', () => {
		isComputerMoveSpy.mockReturnValue(true);
		isGameOverSpy.mockReturnValue(false);
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 0})

		wrapper = render(
			<Provider store={store}>
				<Game mode={0} firstMove='cpu'/>
			</Provider>);


		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		act(() => {
			fireEvent.click(positionOne);

		});
		jest.runAllTimers();
		const action = store.getActions().find(action => action.type === 'MAKE_MOVE');
		expect(action.payload.location).toStrictEqual({ x: 0, y: 0});
		expect(action.payload.icon).toStrictEqual('O');

	})
	it('The mergeboard function will highlight the losing squares if the cpu icon won but the mode is 1', () => {
		const action = {
			type: actions.CHANGE_HUMAN_ICON,
		};
		changeIconSpy.mockReturnValue(action);

		wrapper = render(
			<Provider store={store}>
				<Game mode={1} firstMove='human'/>
			</Provider>);

		const positionOne = wrapper.getByTestId('col-1').children[0];
		const positionTwo = wrapper.getByTestId('col-1').children[1];

		act(() => {
			fireEvent.click(positionOne);
			fireEvent.click(positionTwo);

		});
		expect(changeIconSpy).toHaveBeenCalledTimes(2);

	})
	it('The position status is called with the winner and the winning locations', () => {
		const gameWinner = 'X';
		const action = {
			type: actions.CHANGE_HUMAN_ICON,
		};
		changeIconSpy.mockReturnValue(action);
		isGameOverSpy.mockReturnValueOnce({
			winner: gameWinner,
			location: [
				{x: 0, y: 0},
				{x: 1, y: 1},
				{x: 0, y: 2}
			]
		});

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

		expect(getPositionStatusClassSpy).toHaveBeenCalledTimes(3);
		expect(getPositionStatusClassSpy).toHaveBeenCalledWith(1, 'X', gameWinner);
	})
	it('The computer moves first if the first move is the cpu', () => {
		isGameOverSpy.mockReturnValue(false);
		isComputerMoveSpy.mockReturnValue(true);
		randomCpuMoveSpy.mockReturnValue({x: 0, y: 1});

		wrapper = render(
			<Provider store={store}>
				<Game mode={0} firstMove='cpu'/>
			</Provider>);
		jest.runAllTimers();

		const actionThree = store.getActions().find(action => action.type === 'MAKE_MOVE');
		expect(actionThree.payload.location).toStrictEqual({x: 0, y: 1});
		expect(actionThree.payload.icon).toBe('O');
	})
})