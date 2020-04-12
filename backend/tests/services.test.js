const authServices = require('../api/services/auth');
const gamesServices = require('../api/services/games');
const Users = require('../api/models/users');
const Games = require('../api/models/games');


describe('authService', () => {

	beforeEach(() => {
		jest.resetAllMocks();
	})
	describe('createUser', () => {
		const createUserMock = jest.spyOn(Users, 'create');
		
		it('returns the user if no errors is thrown', async () => {
			const createUserValue = {firstName: 'Fred'}
			createUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved(createUserValue);
				}));

			const { newUser, error, isValid } = await authServices.createUser(createUserValue);
			expect(createUserMock).toHaveBeenCalledWith(createUserValue);
			expect(newUser).toBe(createUserValue);
			expect(error).toBe(null);
			expect(isValid).toBe(true);
		})
		it('returns the error if an errors thrown', async () => {
			const createUserError = {auth: {msg: 'Error Found'}};
			const createUserValue = {firstName: 'Fred'};
			createUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					rejected(createUserError)
				}))

			const { newUser, error, isValid } = await authServices.createUser(createUserValue);
			expect(createUserMock).toHaveBeenCalledWith(createUserValue);
			expect(newUser).toBe(null);
			expect(error).toBe(createUserError);
			expect(isValid).toBe(false);
		})
	})
	describe('saveGame', () => {
		const saveGameMock = jest.spyOn(Games, 'create');
		it('returns the game if no errors are thrown', async () => {
			const saveGameValue = {id: 1}
			saveGameMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					resolved(saveGameValue)
				})
			)

			const { newGame, error, isValid } = await gamesServices.saveGame(saveGameValue);
			expect(saveGameMock).toHaveBeenCalledWith(saveGameValue);
			expect(newGame).toBe(saveGameValue);
			expect(error).toBe(null);
			expect(isValid).toBe(true);
		})
		it('returns the error if an errors thrown', async () => {
			const saveGameValue = {id: 1};
			const saveGameErrors = {auth: {msg: 'Not Authorized'}}
			saveGameMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					rejected(saveGameErrors)
				})
			)

			const { newGame, error, isValid } = await gamesServices.saveGame(saveGameValue);
			expect(saveGameMock).toHaveBeenCalledWith(saveGameValue);
			expect(newGame).toBe(null);
			expect(error).toBe(saveGameErrors);
			expect(isValid).toBe(false);
		})
	})
	describe('deleteGames', () => {
		const userId = 1;
		const deleteGamesMock = jest.spyOn(Games, 'deleteMany');

		it('returns the \'games deleted\' if no errors are thrown', async () => {
			deleteGamesMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					resolved('');
				})
			)
			const { error, isValid, deletedMessage} = await gamesServices.deleteGames(userId);
			expect(error).toBe(null);
			expect(isValid).toBe(true);
			expect(deletedMessage).toBe('games deleted');
		})
		it('returns the error if an error is thrown', async () => {
			const userId = 1;
			const deleteGamesError = 'Cannot Delete';
			deleteGamesMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					rejected(deleteGamesError);
				})
			)
			const { error, isValid, deletedMessage} = await gamesServices.deleteGames(userId);
			expect(error).toBe(deleteGamesError);
			expect(isValid).toBe(false);
			expect(deletedMessage).toBe(null);
		})
	})
	describe('getGamesByUser', () => {
		const getGamesMock = jest.spyOn(Games, 'find');

		it('returns the games if no errors are thrown', async () => {
			const expectedGames = [{id: 1}, {id: 2}]
			getGamesMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					resolved(expectedGames)
				})
			)
			const userId = 1;
			const { error, isValid, games} = await gamesServices.getGamesByUser(userId);
			expect(error).toBe(null);
			expect(isValid).toBe(true);
			expect(games).toStrictEqual(expectedGames);
		})
		it('returns the error if an error is thrown', async () => {
			const expectedError = 'Error'
			getGamesMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) => {
					rejected(expectedError)
				})
			)
			const userId = 1;
			const { error, isValid, games} = await gamesServices.getGamesByUser(userId);
			expect(error).toBe(expectedError);
			expect(isValid).toBe(false);
			expect(games).toBe(null);
		})
	})
})
