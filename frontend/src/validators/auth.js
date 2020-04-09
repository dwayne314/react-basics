import Validator from 'validator';
import { getErrors, isEmpty } from '../utils/utils';


const authValidator = {

	registration: ({first_name='', last_name='', username='', password=''}) => {
		let errors = {};
		const requiredFieldName = {name: 'required'};
		const minMaxFieldName = {name: 'minMax'};
		const usernameMinMax = {min: 4, max: 10};
		const passwordMinMax = {min: 4, max: 10};

		if (!first_name) {
			errors.first_name = getErrors('auth', 'required', {fieldName: 'First name'})
		}
		if (!last_name) {
			errors.last_name = getErrors('auth', 'required', {fieldName: 'Last name'})
		}
		if (!username) {
			errors.username = getErrors('auth', 'required', {fieldName: 'Username'})
		} else if (!Validator.isLength(username, usernameMinMax)) {
			errors.username = getErrors('auth', 'minMax', {...usernameMinMax, fieldName: 'Username'})
		}
		if (!password) {
			errors.password = getErrors('auth', 'required', {fieldName: 'Password'})
		} else if (!Validator.isLength(password, passwordMinMax)) {
			errors.password = getErrors('auth', 'minMax', {...passwordMinMax, fieldName: 'Password'})
		}
		
		return {
			errors: isEmpty(errors) ? null : errors,
			result: isEmpty(errors) ? {first_name, last_name, username, password} : null,
			isValid: isEmpty(errors)
		};
	},
	login: ({username, password}) => {
		let errors = {};
		const requiredFieldName = {name: 'required'};

		if (!username) {
			errors.username = getErrors('auth', 'required', {fieldName: 'Username'})
		}
		if (!password) {
			errors.password = getErrors('auth', 'required', {fieldName: 'Password'})
		}

		return {
			errors: isEmpty(errors) ? null : errors,
			result: isEmpty(errors) ? {username, password} : null,
			isValid: isEmpty(errors)
		};
	}
}

export default authValidator;
