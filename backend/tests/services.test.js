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
})