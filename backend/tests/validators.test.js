const validators = require('../api/validators/auth');
const Utils = require('../api/utils');
const Users = require('../api/models/users');


describe('Validators', () => {

	const findUserMock = jest.spyOn(Users, 'findOne');
	const consoleMock = jest.spyOn(console, 'log')

	describe('authValidator', () => {

		let first_name;
		let last_name;
		let username;
		let password;

		beforeEach(() => {
			jest.resetAllMocks();
			first_name = '';
			last_name = '';
			username = '';
			password = '';
		})
		it('missing fields have error messages', async () => {

			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved('')
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(errors.isValid).toBeFalsy();
			expect(errors.result).toBeFalsy();
			expect(errors.first_name.msg).toBeTruthy();
			expect(errors.last_name.msg).toBeTruthy();
			expect(errors.username.msg).toBeTruthy();
			expect(errors.password.msg).toBeTruthy();
		})
		it('username enforces min length validation', async () => {
			username = 'usr';

			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					rejected('rejectedPromise')
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(errors.isValid).toBeFalsy();
			expect(errors.result).toBeFalsy();
			expect(errors.first_name.msg).toBeTruthy();
			expect(errors.last_name.msg).toBeTruthy();
			expect(errors.username.msg).toBe('Username must be between 4 and 10 characters');
			expect(errors.password.msg).toBeTruthy();
		})
		it('password enforces min length validation', async () => {
			password = 'pp';

			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved('')
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(errors.isValid).toBeFalsy();
			expect(errors.result).toBeFalsy();
			expect(errors.first_name.msg).toBeTruthy();
			expect(errors.last_name.msg).toBeTruthy();
			expect(errors.username.msg).toBeTruthy();
			expect(errors.password.msg).toBe('Password must be between 4 and 10 characters');
		})
		it('no errors are thrown if all fields are included and username / password min length validates', async () => {
			first_name = 'fname';
			last_name = 'lname';
			username = 'huervy';
			password = 'johnson';

			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					rejected(undefined)
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(errors).toBeFalsy();
			expect(result).toBeTruthy();
			expect(result.first_name).toBe(first_name);
			expect(result.last_name).toBe(last_name);
			expect(result.username).toBe(username);
			expect(result.password).toBe(password);
		})
		it('a duplication error is thrown if the the found user is not null', async () => {
			first_name = 'fname';
			last_name = 'lname';
			username = 'huervy';
			password = 'johnson';
			const errorMsg = 'error'
			await findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					rejected(errorMsg)
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(consoleMock).toHaveBeenCalledWith(errorMsg);
		})
		it('a duplication error is thrown if the the found user is not null', async () => {
			first_name = 'fname';
			last_name = 'lname';
			username = 'huervy';
			password = 'johnson';
			const errorMsg = 'found user'
			await findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved(errorMsg)
				}))
			const {errors, result, isValid } = await validators.validateRegistration({first_name, last_name, username, password});

			expect(errors.username.msg).toBe('Username already exists')
		})
	})
	describe('validatePassword', () => {
		it('returns true if the passwords are equal', () => {
			expect(validators.validatePassword('pw1', 'pw1')).toBeTruthy();
		})
		it('returns false if the passwords are not equal', () => {
			expect(validators.validatePassword('pw1', 'pw2')).toBeFalsy();
		})
	})
})