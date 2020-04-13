const Validator = require('validator');
const utils = require('../utils');


const validateGameSave = async ({status='', human_first='', ai_active='', userId=''}) => {
	let errors = {};

	if (status === '') {
		errors.status = utils.getErrors('game', 'required', {fieldName: 'Status'})
	}
	if (human_first === '') {
		errors.human_first = utils.getErrors('game', 'required', {fieldName: 'Human first'})
	}
	if (ai_active === '') {
		errors.ai_active = utils.getErrors('game', 'required', {fieldName: 'Ai Active'})
	}
	if (!userId) {
		errors.user = utils.getErrors('auth', 'authentication')
	} 

	return {
		errors: utils.isEmpty(errors) ? null : errors,
		result: utils.isEmpty(errors) ? {status, human_first, ai_active, played_by: userId} : null,
		isValid: utils.isEmpty(errors)
	};
}

module.exports = {
	validateGameSave
};



