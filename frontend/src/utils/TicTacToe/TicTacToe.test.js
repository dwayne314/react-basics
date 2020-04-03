// Mock Dependencies
import * as TicTacUtils from './TicTacToe';
import * as Utils from '../utils';

describe('TicTacToe Utils', () => {	
	const randomMock = jest.spyOn(Utils, 'getRandomNumber');
	let board = [
		[['X'], [], []],
		[[], [], []],
		[[], [], []]
		];

	afterEach(() => {
		randomMock.mockReset()
	})

	it('getPositionIcon returns the icon in the position', () => {
		const firstLocation = { x:0, y:0 };
		const boardIcon = TicTacUtils.getPositionIcon(firstLocation, board);

		expect(boardIcon).toBe('X');
	})
	it('makeRandomComputerMove returns the location if the spot is not occupied', () => {
		randomMock
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(1);

		const location = TicTacUtils.makeRandomComputerMove(board);
		expect(location.x).toBe(0);
		expect(location.y).toBe(1);
	})
	it('makeRandomComputerMove runs again if the location if the spot is occupied', () => {
		randomMock
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(0)
		    .mockReturnValueOnce(2);

		const location = TicTacUtils.makeRandomComputerMove(board);
		expect(location.x).toBe(0);
		expect(location.y).toBe(2);
	})
	it('checkGameOver will return an empty location and winner if the game is a tie', () => {
		board = [
		[['X'], ['O'], ['X']],
		[['X'], ['X'], ['O']],
		[['O'], ['X'], ['O']]
		];
		const expectedStatus =  {location: undefined, winner: ''};

		const gameOverStatus = TicTacUtils.checkGameOver(board);
		expect(gameOverStatus).toStrictEqual(expectedStatus);
	})
	it('checkGameOver will return the location of the winning squaared if the game is won', () => {
		board = [
		[['X'], ['O'], ['X']],
		[['X'], ['O'], ['O']],
		[['X'], ['X'], ['O']]
		];
		const expectedStatus =  {
			location: [
				{ x: 0, y: 0 },
				{ x: 1, y: 0 },
				{ x: 2, y: 0 }
			],
			winner: 'X'
		}

		const gameOverStatus = TicTacUtils.checkGameOver(board);
		expect(gameOverStatus).toStrictEqual(expectedStatus);
	})
	it('checkGameOver will return false if the game is still going', () => {
		board = [
		[['X'], [], []],
		[[], [], []],
		[[], [], ['O']]
		];
		const expectedStatus =  false

		const gameOverStatus = TicTacUtils.checkGameOver(board);
		expect(gameOverStatus).toBe(false);
	})
	it('getPositionStatusClass will return " winner" if the mode is 1 and and the human is the game winner', ()=> {
		const positionStatus = TicTacUtils.getPositionStatusClass(1, 'X', 'X');
		expect(positionStatus).toBe(' winner');
	})
	it('getPositionStatusClass will return " winner" if the mode is 1 and and the human is not the game winner', ()=> {
		const positionStatus = TicTacUtils.getPositionStatusClass(1, 'X', 'O');
		expect(positionStatus).toBe(' winner');
	})
	it('getPositionStatusClass will return " loser" if the mode is 1 and and the human is the game winner', ()=> {
		const positionStatus = TicTacUtils.getPositionStatusClass(0, 'X', 'O');
		expect(positionStatus).toBe(' loser');
	})
})