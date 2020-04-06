const Users = require('../api/models/users');
const customHooks = require('../api/models/hooks');


describe('Hooks', () => {

	const nextMock = jest.fn();
	const mockContext = {update: jest.fn()};

	describe('setUpdatedAt', () => {
		it('uses pre-update updates the updated_at time', () => {
			customHooks.setUpdatedAt.call(mockContext, nextMock);
			expect(nextMock).toHaveBeenCalledTimes(1);
			expect(mockContext['update']).toHaveBeenCalledWith({}, {"$set": {"updated_at": expect.any(Date)}})
		})
	})	
});
