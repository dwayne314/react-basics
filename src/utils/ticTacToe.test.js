import * as Utils from './TicTacToe';

describe('TicTacToe Utils', () => {
	const board = [
		[['X'], [], []],
		[[], [], []],
		[[], [], []]
		]

	it('getPositionIcon', () => {
		const firstLocation = {
			x:0 ,
			y:0
		}

		const boardIcon = Utils.getPositionIcon(firstLocation, board)
		expect(boardIcon).toBe('X')
	})
})