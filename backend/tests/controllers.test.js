const authController = require('../api/controllers/auth');
const gameController = require('../api/controllers/games');
const authServices = require('../api/services/auth');
const mocks = require('./__mocks__.js');


describe('Controllers', () => {
	let req;	
	let res;
	let createUserMock = jest.spyOn(authServices, 'createUser');

	beforeEach(() => {
		req = mocks.getMockRequest();
		res = mocks.getMockResponse();	
	})

	describe('authController', () => {

		it('login', () => {
			authController.login(req, res);
			expect(res.json).toHaveBeenCalledWith('Posting to login route');
		})
		it('register if the registration is valid', async () => {
			mockRegisterReturn = {
				newUser: {_id: 1, first_name: 'Fred'},
				isValid: true
			}
			req = mocks.getMockRequest(mockRegisterReturn);
			createUserMock.mockReturnValueOnce(mockRegisterReturn);
			await authController.register(req, res);

			expect(res.json).toHaveBeenCalledWith(mockRegisterReturn.newUser);
			expect(res.status).toHaveBeenCalledWith(201);
		})
		it('register if the registration is not valid', async () => {
			mockRegisterReturn = {
				error: {auth: {msg: "Registration Error"}},
				isValid: false
			}
			req = mocks.getMockRequest(mockRegisterReturn);
			createUserMock.mockReturnValueOnce(mockRegisterReturn);
			await authController.register(req, res);

			expect(res.json).toHaveBeenCalledWith(mockRegisterReturn.error);
			expect(res.status).toHaveBeenCalledWith(401);
		})
		it('logout', () => {
			authController.logout(req, res);
			expect(res.json).toHaveBeenCalledWith('Posting to logout route');
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
