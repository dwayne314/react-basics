// Library Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// App Dependencies
import Position from './Position';


describe('Position', () => {
	let onClick = jest.fn();
	let wrapper;
	let mergeBoard = jest.fn();
	mergeBoard.mockReturnValue({status: ' winner', text: 'X'});

	beforeEach(() => {
		let id = 1;		
		wrapper = render(<Position mergeBoard={mergeBoard} onClick={onClick} id={id}  />);
	});
	it('renders the correct text', () => {
		expect(wrapper.getByTestId("position-text").innerHTML).toBe("X");
	});
	it('renders the correct status', () => {
		expect(wrapper.getByTestId("position").classList.contains('winner')).toBe(true);
	});
	it('fires onClick when clicking a position', () => {
		const position = wrapper.getByTestId("position");
		expect(onClick).toHaveBeenCalledTimes(0);
		fireEvent.click(position);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
