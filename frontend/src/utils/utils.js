export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getErrors = (cls, type, data) => {
	if (type === 'required')  {
		return {cls: cls, msg: `${data.fieldName} is a required field`}
	}
	else if (type === 'minMax')  {
		return {cls: cls, msg: `${data.fieldName} must be between ${data.min} and ${data.max} characters`}
	}
	else return null
}

export const isEmpty = (obj) => Object.keys(obj).length === 0;
