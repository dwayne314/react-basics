const authServices = require('../api/services/auth');
const Users = require('../api/models/users');


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
				() => new Promise((resolved, rejected) =>{
					rejected(createUserError)
				}))

			const { newUser, error, isValid } = await authServices.createUser(createUserValue);
			expect(createUserMock).toHaveBeenCalledWith(createUserValue);
			expect(newUser).toBe(null);
			expect(error).toBe(createUserError);
			expect(isValid).toBe(false);
		})
	})
})