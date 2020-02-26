import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';

import Game from './Game';
import * as Utils from '../../utils/TicTacToe/TicTacToe'

let randomCpuMoveSpy = jest.spyOn(Utils, 'makeRandomComputerMove');
const windowAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.useFakeTimers();

describe('Game', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(<Game mode={0} firstMove='human'/>);
	});

	afterEach(() => {
		randomCpuMoveSpy.mockClear();
		windowAlert.mockClear();
	})
	it('renders 3 rows for the game', () => {
		const game = wrapper.getByTestId('game').children;
		expect(game.length).toBe(3);
	})
	it('Clicking an empty position updates the display', () => {

		const positionOne = wrapper.getByTestId('game').firstChild.firstChild;

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1})
		act(() => {
			fireEvent.click(positionOne);
		});

		const board = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(board).toStrictEqual(["X", "", "", "", "", "", "", "", ""]);

		act(() => {
			jest.runAllTimers();
		});
		const updatedBoard = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(updatedBoard).toStrictEqual(["X", "O", "", "", "", "", "", "", ""]);

	})
	it('Tests a human win calls the correct alert and the winning squares highlight', async () => {
	 	const positionOne = wrapper.getByTestId('col-1').children[0];
	 	const positionTwo = wrapper.getByTestId('col-2').children[1];
	 	const positionThree = wrapper.getByTestId('col-3').children[2];
		
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1})
	 	act(() => {
		 	fireEvent.click(positionOne);	
		 	jest.runAllTimers();
	 	});
	 	
	 	randomCpuMoveSpy.mockReturnValueOnce({x: 1, y: 2});
	 	act(() => {
		 	fireEvent.click(positionTwo);	
		 	jest.runAllTimers();
	 	});
	 	
	 	act(() => {
		 	fireEvent.click(positionThree);
		 	jest.runAllTimers();
	 	})
		// The alerts are called correctly
		expect(windowAlert).toHaveBeenCalledTimes(1)
		expect(windowAlert).toHaveBeenCalledWith('X')

		// The position classes get updated correctly
		expect(positionOne.classList.contains('winner')).toBe(true)
		expect(positionTwo.classList.contains('winner')).toBe(true)
		expect(positionThree.classList.contains('winner')).toBe(true)
	})
	it('Tests a cpu win calls the correct alert and the losing squares highlight', () => {
	 	const positionOne = wrapper.getByTestId('col-1').children[1];
	 	const positionTwo = wrapper.getByTestId('col-2').children[2];
	 	const positionThree = wrapper.getByTestId('col-3').children[1];
		
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 0})
	 	act(() => {
		 	fireEvent.click(positionOne);	
		 	jest.runAllTimers();
	 	});
	 	
	 	randomCpuMoveSpy.mockReturnValueOnce({x: 1, y: 1});
	 	act(() => {
		 	fireEvent.click(positionTwo);	
		 	jest.runAllTimers();
	 	});
	 	
	 	randomCpuMoveSpy.mockReturnValueOnce({x: 2, y: 2});
	 	act(() => {
		 	fireEvent.click(positionThree);
		 	jest.runAllTimers();
	 	})

		expect(windowAlert).toHaveBeenCalledTimes(1);
		expect(windowAlert).toHaveBeenCalledWith('O');

		const cpuPositionOne = wrapper.getByTestId('col-1').children[0];
		const cpuPositionTwo = wrapper.getByTestId('col-2').children[1];
		const cpuPositiontThree = wrapper.getByTestId('col-3').children[2];

		expect(cpuPositionOne.classList.contains('loser')).toBe(true)
		expect(cpuPositionTwo.classList.contains('loser')).toBe(true)
		expect(cpuPositiontThree.classList.contains('loser')).toBe(true)
	})
	it('Tests a tie an alert for a tie', () => {
	 	const positionOne = wrapper.getByTestId('col-1').children[0];
	 	const positionTwo = wrapper.getByTestId('col-1').children[2];
	 	const positionThree = wrapper.getByTestId('col-2').children[1];
	 	const positionFour = wrapper.getByTestId('col-2').children[2];
	 	const positionFive = wrapper.getByTestId('col-3').children[1];
		
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 1})
	 	act(() => {
		 	fireEvent.click(positionOne);	
		 	jest.runAllTimers();
	 	});
	 	
	 	randomCpuMoveSpy.mockReturnValueOnce({x: 1, y: 0});
	 	act(() => {
		 	fireEvent.click(positionTwo);	
		 	jest.runAllTimers();
	 	});
	 	
	 	randomCpuMoveSpy.mockReturnValueOnce({x: 2, y: 0});
	 	act(() => {
		 	fireEvent.click(positionThree);
		 	jest.runAllTimers();
	 	})

	 	randomCpuMoveSpy.mockReturnValueOnce({x: 2, y: 2});
	 	act(() => {
		 	fireEvent.click(positionFour);
		 	jest.runAllTimers();
	 	})

	 	act(() => {
		 	fireEvent.click(positionFive);
		 	jest.runAllTimers();
	 	})

		expect(windowAlert).toHaveBeenCalledTimes(1);
		expect(windowAlert).toHaveBeenCalledWith('its a tie');
	})
	
})
describe('Game Implementation', () => {
	it('Tests cpu goes if human is not the first move', () => {
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 0})
		const wrapper = render(<Game mode={0} firstMove='cpu'/>);

		act(() => {
		 	jest.runAllTimers();
	 	})
	 	const board = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(board).toStrictEqual(["X", "", "", "", "", "", "", "", ""]);
	})

	it('Tests the human cannot click during the cpu move', () => {
		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 0})
		const wrapper = render(<Game mode={1} firstMove='cpu'/>);
		const positionOne = wrapper.getByTestId('col-1').children[1];

		act(() => {
		 	fireEvent.click(positionOne);	
		 	jest.runAllTimers();
	 	});
	 	const board = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(board).toStrictEqual(["X", "", "", "", "", "", "", "", ""]);
	})

	it('Tests human vs. human mode enables human clicks', () => {
		const wrapper = render(<Game mode={1} firstMove='human'/>);
		const positionOne = wrapper.getByTestId('col-1').children[0];
	 	const positionTwo = wrapper.getByTestId('col-1').children[1];

		act(() => {
		 	fireEvent.click(positionOne);
		 	jest.runAllTimers();
		 	fireEvent.click(positionTwo);
	 	});
	 	const board = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(board).toStrictEqual(["X", "O", "", "", "", "", "", "", ""]);
	})

	it('Tests a human cannot click on an occupied square', () => {
		
		const wrapper = render(<Game mode={0} firstMove='human'/>);
	 	const positionOne = wrapper.getByTestId('col-1').children[1];
	 	const occupiedPosition = wrapper.getByTestId('col-1').children[0];

		randomCpuMoveSpy.mockReturnValueOnce({x: 0, y: 0})
	 	act(() => {
		 	fireEvent.click(positionOne);	
		 	jest.runAllTimers();
	 	});
	 	
	 	act(() => {
		 	fireEvent.click(occupiedPosition);	
		 	jest.runAllTimers();
	 	});
	 	
	 	const board = wrapper.getAllByTestId('position-text')
		    .map(position => position.innerHTML);
		expect(board).toStrictEqual(["O", "X", "", "", "", "", "", "", ""]);
	})
})





