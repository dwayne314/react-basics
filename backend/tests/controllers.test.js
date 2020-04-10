const authController = require('../api/controllers/auth');
const gameController = require('../api/controllers/games');
const authServices = require('../api/services/auth');
const validators = require('../api/validators/auth')
const mocks = require('./__mocks__.js');
const Users = require('../api/models/users');


describe('Controllers', () => {
	let req;	
	let res;
	let createUserMock = jest.spyOn(authServices, 'createUser');
	let validateRegistrationMock = jest.spyOn(validators, 'validateRegistration');



	beforeEach(() => {
		jest.resetAllMocks();
		req = mocks.getMockRequest();
		res = mocks.getMockResponse();	
	})

	describe('authController', () => {

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

		it('save', () => {
			gameController.save(req, res);
			expect(res.json).toHaveBeenCalledWith('Saving to game route')
		})
		it('delete', () => {
			gameController.delete(req, res);
			expect(res.json).toHaveBeenCalledWith('Patching to game route')
		})
	})

})
