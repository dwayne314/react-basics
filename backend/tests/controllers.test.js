const authController = require('../api/controllers/auth');
const gameController = require('../api/controllers/games');
const authServices = require('../api/services/auth');
const authValidators = require('../api/validators/auth');
const gameServices = require('../api/services/games');
const gameValidators = require('../api/validators/games');
const mocks = require('./__mocks__.js');
const Users = require('../api/models/users');


describe('Controllers', () => {
	let req;	
	let res;

	beforeEach(() => {
		jest.resetAllMocks();
		req = mocks.getMockRequest();
		res = mocks.getMockResponse();	
	})

	describe('authController', () => {
		let createUserMock = jest.spyOn(authServices, 'createUser');
		let validateRegistrationMock = jest.spyOn(authValidators, 'validateRegistration');

		it('register if the registration is valid and creating user is valid', async () => {
			mockRegisterReturn = {
				newUser: {_id: 1, first_name: 'Fred'},
				isValid: true
			}
			req = mocks.getMockRequest(mockRegisterReturn);
			createUserMock.mockReturnValueOnce(mockRegisterReturn);
			validateRegistrationMock.mockReturnValueOnce({isValid: true});

			await authController.register(req, res);

			expect(res.json).toHaveBeenCalledWith(mockRegisterReturn.newUser);
			expect(res.status).toHaveBeenCalledWith(201);
		})
		it('send an error if the registration is valid and the database sends and error', async () => {
			mockRegisterReturn = {
				newUser: {_id: 1, first_name: 'Fred'},
				isValid: true
			}
			req = mocks.getMockRequest(mockRegisterReturn);
			createUserMock.mockReturnValueOnce({isValid: false, error: 'create user error'});
			validateRegistrationMock.mockReturnValueOnce({isValid: true});

			await authController.register(req, res);

			expect(res.json).toHaveBeenCalledWith('create user error');
			expect(res.status).toHaveBeenCalledWith(401);
		})
		it('send an error if the registration is invalid', async () => {
			mockRegisterReturn = {
				newUser: {_id: 1, first_name: 'Fred'},
				isValid: true
			}
			req = mocks.getMockRequest(mockRegisterReturn);
			validateRegistrationMock.mockReturnValueOnce({isValid: false, errors: 'validation error'});

			await authController.register(req, res);

			expect(res.json).toHaveBeenCalledWith('validation error');
			expect(res.status).toHaveBeenCalledWith(401);
		})
		it('logout', () => {
			authController.logout(req, res);
			expect(res.json).toHaveBeenCalledWith({"auth": "User has been logged out"});
			expect(res.status).toHaveBeenCalledWith(201);
		})
	})

	describe('gameController', () => {

		describe('save', () => {
			let saveGameMock = jest.spyOn(gameServices, 'saveGame');
			let validateGameSaveMock = jest.spyOn(gameValidators, 'validateGameSave');

			it('if the game save is valid and there\'s no database errors the game is saved', async () => {
				const newGame = 'New game';
				validateGameSaveMock.mockReturnValueOnce({errors: 'd', isValid: true});
				saveGameMock.mockReturnValueOnce({isValid: true, newGame: newGame})
				await gameController.save(req, res);
				expect(res.status).toHaveBeenCalledWith(201);
				expect(res.json).toHaveBeenCalledWith(newGame);
			})
			it('send an error if the the game save is invalid', async () => {
				const errMsg = 'Error';
				validateGameSaveMock.mockReturnValueOnce({isValid: false, errors: errMsg});
				await gameController.save(req, res);
				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.json).toHaveBeenCalledWith(errMsg);
			})
			it('send an error if the game save is valid and the database sends and error', async () => {
				const errMsg = 'Error';
				validateGameSaveMock.mockReturnValueOnce({isValid: true});
				saveGameMock.mockReturnValueOnce({isValid: false, error: errMsg})
				await gameController.save(req, res);
				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.json).toHaveBeenCalledWith(errMsg);
			})
			it('pushes the userId to undefined if the user isn\'t authenticated', async () => {
				validateGameSaveMock.mockReturnValueOnce({isValid: false});
				const unauthenticatedReq = mocks.getMockRequest(body={}, false);
				const errMsg = 'Error';
				await gameController.save(req, res);
				expect(req.isAuthenticated).toHaveBeenCalledTimes(1);
			}) 
		})

		describe('delete', () => {
			let deleteGamesMock = jest.spyOn(gameServices, 'deleteGames');

			it('if the delete games is valid send the delete message and the games are deleted', async () => {
				const deletedMessage = 'Deleted';
				deleteGamesMock.mockReturnValueOnce({isValid: true, deletedMessage: deletedMessage});
				await gameController.delete(req, res);
				expect(res.json).toHaveBeenCalledWith(deletedMessage);
				expect(res.status).toHaveBeenCalledWith(201);
			})
			it('send the error if the delete games is not valid', async () => {
				const error = 'Error';
				deleteGamesMock.mockReturnValueOnce({isValid: false, error: error});
				await gameController.delete(req, res);
				expect(res.json).toHaveBeenCalledWith(error);
				expect(res.status).toHaveBeenCalledWith(401);
			})
			it('send the error if the request is not authenticated', async () => {
				req.isAuthenticated = () => false;
				const error = 'Error';
				await gameController.delete(req, res);
				expect(res.json).toHaveBeenCalledWith({auth: 'User not authenticated'});
				expect(res.status).toHaveBeenCalledWith(401);
			})
		})
		
		
		describe('get', () => {
			let getGamesMock = jest.spyOn(gameServices, 'getGamesByUser');

			it('if the get games is valid return the games', async () => {
				const games = [{id: 1}, {id: 2}];
				getGamesMock.mockReturnValueOnce({isValid: true, games: games});
				await gameController.get(req, res);
				expect(res.json).toHaveBeenCalledWith(games);
				expect(res.status).toHaveBeenCalledWith(201);
			})
			it('send the error if the get games is not valid', async () => {
				const error = 'Error';
				getGamesMock.mockReturnValueOnce({isValid: false, error: error});
				await gameController.get(req, res);
				expect(res.json).toHaveBeenCalledWith(error);
				expect(res.status).toHaveBeenCalledWith(401);
			})
			it('send the error if the request is not authenticated', async () => {
				req.isAuthenticated = () => false;
				const error = 'Error';
				await gameController.get(req, res);
				expect(res.json).toHaveBeenCalledWith({auth: 'User not authenticated'});
				expect(res.status).toHaveBeenCalledWith(401);
			})
		})
	})

})












































