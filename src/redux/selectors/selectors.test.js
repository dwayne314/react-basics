// App Dependencies
import {
	getWins,
	getLosses,
	getTies,
	getGameMode,
	getGameBoard,
	getCurrentPlayer,
	getHumanIcon,
	getCpuIcon,
	isGameOver
} from './selectors';


describe('Selectors', () => {
	it('getWins', () => {
		const state = {games: [1,0, 1, -1]};
		const winCount = getWins(state);
		expect(winCount).toBe(2);

	})
	it('getLosses', () => {
		const state = {games: [-1,0, 1, -1]}
		const lossCount = getLosses(state);
		expect(lossCount).toBe(2);

	})
	it('getTies', () => {
		const state = {games: [-1,0, 0, 0]}
		const tieCount = getTies(state);
		expect(tieCount).toBe(3);

	})
	it('getGameMode', () => {
		const state = {gameState: { gameMode: 0}};
		const gameMode = getGameMode(state);
		expect(gameMode).toBe(0);
	})
	it('getGameBoard', () => {
		const board = [
			[['X'], [], []],
			[[], ['O'], []],
			[[], [], []]
		];
		const state = {gameState: { currentBoard: board}};
		const gameBoard = getGameBoard(state);
		expect(gameBoard).toBe(board);
	})
	it('getCurrentPlayer', () => {
		const state = {gameState: { currentPlayer: 'X'}};
		const currentPlayer = getCurrentPlayer(state);
		expect(currentPlayer).toBe('X');
	})
	it('getHumanIcon', () => {
		const state = {gameState: { humanIcon: 'X'}};
		const gameMode = getHumanIcon(state);
		expect(gameMode).toBe('X');
	})
	it('getCpuIcon', () => {
		const state = {gameState: { cpuIcon: 'O'}};
		const gameMode = getCpuIcon(state);
		expect(gameMode).toBe('O');
	})
	it('isGameOver', () => {
		const state = {gameState: { isGameOver: false }};
		const gameOver = isGameOver(state);
		expect(gameOver).toBe(false);
	})

})
