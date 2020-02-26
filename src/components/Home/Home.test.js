import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

import Home from './Home';
import * as Utils from '../../utils/TicTacToe/TicTacToe';


let randomCpuMoveSpy = jest.spyOn(Utils, 'makeRandomComputerMove');
const windowAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.useFakeTimers();

describe('Home', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = render(
			<Provider store={store}>
				<Home />
			</Provider>)
	})
	afterEach(() => {
		randomCpuMoveSpy.mockClear();
		windowAlert.mockClear();
	})
	it('renders the login container', () => {
		const homeTitle = wrapper.getByTestId('home-title')
		expect(homeTitle.innerHTML).toBe("Human vs Computer")
	})
})

describe('Settings and Score Board', () => {
	it('Tests the win populates the scoreboard', () => {
		const wrapper = render(
			<Provider store={store}>
				<Home />
			</Provider>);

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

	 	const board = wrapper.getByTestId("win-counter").innerHTML
	 	expect(board).toBe("1")
	})
	it('Tests the loss updates the scoreboard', () => {
		const wrapper = render(
			<Provider store={store}>
				<Home />
			</Provider>);

		const positionOne = wrapper.getByTestId('col-1').children[1];
	 	const positionTwo = wrapper.getByTestId('col-2').children[2];
	 	const positionThree = wrapper.getByTestId('col-3').children[0];
		
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

	 	const board = wrapper.getByTestId("loss-counter").innerHTML
	 	expect(board).toBe("1")
	})
	it('Tests the tie updates the scoreboard', () => {
		const wrapper = render(
			<Provider store={store}>
				<Home />
			</Provider>);

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

	 	const board = wrapper.getByTestId("tie-counter").innerHTML
	 	expect(board).toBe("1")
	})

})
