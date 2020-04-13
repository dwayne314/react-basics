const getErrors = (cls, type, data) => {
	if (type === 'required')  {
		return {cls: cls, msg: `${data.fieldName} is a required field`}
	}
	else if (type === 'minMax') {
		return {cls: cls, msg: `${data.fieldName} must be between ${data.min} and ${data.max} characters`}
	}
	else if (type === 'duplicate') {
		return {cls: cls, msg: `${data.fieldName} already exists`}
	}
	else if (type === 'authentication') {
		return {cls: cls, msg: 'Invalid authorization'}
	}
	return null;
}

const isEmpty = (obj) => Object.keys(obj).length === 0;


module.exports = {
	getErrors,
	isEmpty
}