const authController = require('../api/controllers/auth');
const gameController = require('../api/controllers/games')
const mocks = require('./__mocks__.js');


describe('Controllers', () => {
	let req;	
	let res;

	beforeEach(() => {
		req = mocks.getMockRequest();
		res = mocks.getMockResponse();	
	})

	describe('authController', () => {

		it('login', () => {
			authController.login(req, res);
			expect(res.json).toHaveBeenCalledWith('Posting to login route');
		})
		it('register', () => {
			authController.register(req, res);
			expect(res.json).toHaveBeenCalledWith('Posting to register route');
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
