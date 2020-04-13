const authValidators = require('../api/validators/auth');
const gameValidators = require('../api/validators/games');
const Utils = require('../api/utils');
const Users = require('../api/models/users');
const bcrypt = require('bcrypt');


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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

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
			const {errors, result, isValid } = await authValidators.validateRegistration({first_name, last_name, username, password});

			expect(errors.username.msg).toBe('Username already exists')
		})
	})
	describe('validatePassword', () => {
		it('returns true if the passwords are equal', () => {
			const passwordHash = bcrypt.hashSync('pw1', 10);

			expect(authValidators.validatePassword('pw1', passwordHash)).toBeTruthy();
		})
		it('returns false if the passwords are not equal', () => {
			expect(authValidators.validatePassword('pw1', 'pw1')).toBeFalsy();
		})
	})
	describe('validateSaveGame', () => {
		let status ='';
		let human_first ='';
		let ai_active ='';
		let userId ='';

		it('missing fields have error messages', async () => {
			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved('')
				}))
			const {errors, result, isValid } = await gameValidators.validateGameSave({status, human_first, ai_active, userId});

			expect(errors.isValid).toBeFalsy();
			expect(errors.result).toBeFalsy();
			expect(errors.status.msg).toBeTruthy();
			expect(errors.human_first.msg).toBeTruthy();
			expect(errors.ai_active.msg).toBeTruthy();
			expect(errors.user.msg).toBeTruthy();
		})
		it('no errors are thrown if all fields are included', async () => {
			status = -1;
			human_first = 1;
			ai_active = 1;
			userId = 1;

			findUserMock.mockImplementationOnce(
				() => new Promise((resolved, rejected) =>{
					resolved('')
				}))
			const {errors, result, isValid } = await gameValidators.validateGameSave({status, human_first, ai_active, userId});
			expect(errors).toBeFalsy();
			expect(result).toBeTruthy();
			expect(result.status).toBe(status);
			expect(result.human_first).toBe(human_first);
			expect(result.ai_active).toBe(ai_active);
			expect(result.played_by).toBe(userId);
		})
	})
})