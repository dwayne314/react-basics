const Users = require('../api/models/users');
const customHooks = require('../api/models/hooks');
const bcrypt = require('bcrypt');


describe('Hooks', () => {

	const nextMock = jest.fn();
	const bcryptMock = jest.spyOn(bcrypt, 'hashSync');

	afterEach(() => {
		jest.resetAllMocks();
	})


	describe('setUpdatedAt', () => {
		const mockContext = {update: jest.fn()};

		it('uses pre-update updates the updated_at time', () => {
			customHooks.setUpdatedAt.call(mockContext, nextMock);
			expect(nextMock).toHaveBeenCalledTimes(1);
			expect(mockContext['update']).toHaveBeenCalledWith({}, {"$set": {"updated_at": expect.any(Date)}})
		})
	})
	describe('validatePassword', () => {
		const mockSaveContext = {save: jest.fn(), password: 'pw'};

		it('uses pre-update updates the updated_at time', () => {
			customHooks.hashPassword.call(mockSaveContext, nextMock);
			expect(nextMock).toHaveBeenCalledTimes(1);
			expect(bcryptMock).toHaveBeenCalledWith('pw', 10)
		})
	})	
});
