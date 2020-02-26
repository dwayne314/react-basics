import * as TicTacUtils from './TicTacToe';
import * as Utils from '../utils';

describe('TicTacToe Utils', () => {	
	const randomMock = jest.spyOn(Utils, 'getRandomNumber')

	afterEach(() => {
		randomMock.mockReset()
	})

	const board = [
		[['X'], [], []],
		[[], [], []],
		[[], [], []]
		]

	it('getPositionIcon returns the icon in the position', () => {
		const firstLocation = {
			x:0 ,
			y:0
		}

		const boardIcon = TicTacUtils.getPositionIcon(firstLocation, board)
		expect(boardIcon).toBe('X')
	})
	it('makeRandomComputerMove returns the location if the spot is not occupied', () => {
		randomMock
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(1)

		const location = TicTacUtils.makeRandomComputerMove(board)
		expect(location.x).toBe(0)
		expect(location.y).toBe(1)
	})
	it('makeRandomComputerMove runs again if the location if the spot is occupied', () => {
		randomMock
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(2)

		const location = TicTacUtils.makeRandomComputerMove(board)
		expect(location.x).toBe(0)
		expect(location.y).toBe(2)
	})
})