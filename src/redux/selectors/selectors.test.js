import { getWins, getLosses, getTies } from './selectors';
import { CHANGE_GAME_MODE } from '../actions/actions';


describe('Selectors', () => {
	it('getWins', () => {
		const state = {games: [1,0, 1, -1]}
		
		const winCount = getWins(state);
		expect(winCount).toBe(2)

	})
	it('getLosses', () => {
		const state = {games: [-1,0, 1, -1]}
		
		const lossCount = getLosses(state);
		expect(lossCount).toBe(2)

	})
	it('getTies', () => {
		const state = {games: [-1,0, 0, 0]}
		
		const tieCount = getTies(state);
		expect(tieCount).toBe(3)

	})
})