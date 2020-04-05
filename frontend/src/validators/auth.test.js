import authValidator from './auth';
import * as Utils from '../utils/utils';


describe('Validators', () => {

	const getErrorsMock = jest.spyOn(Utils, 'getErrors')
	describe('authValidator', () => {
		const { registration } = authValidator;
		let first_name = '';
		let last_name = '';
		let username = '';
		let password = '';

		afterEach(() => {
			first_name = '';
			last_name = '';
			username = '';
			password = '';
		})
		it('missing fields have error messages', () => {
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			console.log(registration({first_name, last_name, username, password}))
			expect(errors.isValid).toBeFalsy();
			expect(errors.result).toBeFalsy();
			expect(errors.first_name.msg).toBeTruthy();
			expect(errors.last_name.msg).toBeTruthy();
			expect(errors.username.msg).toBeTruthy();
			expect(errors.password.msg).toBeTruthy();
		})
		it('usernames enforce min length validation', () => {
			username = 'Ias';
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			expect(errors.username.msg).toBe('Username must be between 4 and 10 characters');
		})
		it('usernames enforce min length validation', () => {
			username = 'Iasddddddds';
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			expect(errors.username.msg).toBe('Username must be between 4 and 10 characters');
		})
		it('passwords enforce min length validation', () => {
			password = 'PWD';
			console.log(username)
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			expect(errors.password.msg).toBe('Password must be between 4 and 10 characters');
		})
		it('passwords enforce min length validation', () => {
			password = 'dfdfdfderegs';
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			expect(errors.password.msg).toBe('Password must be between 4 and 10 characters');
		})
		it('errors are null if the form is valid', () => {
			first_name = 'James';
			last_name = 'Wild';
			username = 'Juern';
			password = 'Killgor';
			const {errors, result, isValid } = registration({first_name, last_name, username, password});
			expect(isValid).toBeTruthy();
			expect(Object.keys(result).length).toBe(4);
			expect(errors).toBeFalsy();

		})
		it('coerces missing fields to empty strings and generates errors', () => {
			const {errors, result, isValid } = registration({});
			expect(errors.first_name.msg).toBeTruthy();
			expect(errors.last_name.msg).toBeTruthy();
			expect(errors.username.msg).toBeTruthy();
			expect(errors.password.msg).toBeTruthy();
		})
	})
})