import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

import SideMenu from './SideMenu';


import { wrapProvider } from '../../test-utils.js';
import * as ReactRedux from 'react-redux';


// {wins, losses, ties, updateGameMode} 

describe('SideMenu', () => {

	const mockUpdateGameMode = jest.fn();
	const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector')

	afterEach(() => {
		mockUpdateGameMode.mockReset();
		useSelectorMock.mockReset();
	})
	it('The scroeboard shows the current score.', () => {
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
				updateGameMode={mockUpdateGameMode}/>))

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
				updateGameMode={mockUpdateGameMode}/>))

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
				updateGameMode={mockUpdateGameMode}/>))

		const humanMode = wrapper.getByTestId("game-mode-human");
		const cpuMode = wrapper.getByTestId("game-mode-cpu");

		act(() => {
			fireEvent.click(cpuMode);
			fireEvent.click(humanMode);
		})
		expect(mockUpdateGameMode).toHaveBeenNthCalledWith(1, 0)
		expect(mockUpdateGameMode).toHaveBeenNthCalledWith(2, 1)

	})
})
