const getErrors = require('../api/utils').getErrors;
const isEmpty = require('../api/utils').isEmpty;


describe('Utils', () => {
	describe('getErrors', () => {
		it('returns the correct class and message if the field name is required', () => {
			const expectedResult = {cls: 'errorClass', msg: 'first name is a required field'};
			const {cls, msg} = getErrors('errorClass', 'required', {fieldName: 'first name'});
			expect(cls).toBe(expectedResult.cls);
			expect(msg).toBe(expectedResult.msg);
		})
		it('returns the correct class and message if the field name is minMax', () => {
			const expectedResult = {cls: 'errorClass', msg: 'first name must be between 6 and 7 characters'};
			const {cls, msg} = getErrors('errorClass', 'minMax', {fieldName:'first name', min: 6, max: 7});
			expect(cls).toBe(expectedResult.cls);
			expect(msg).toBe(expectedResult.msg);
		})
		it('returns the correct class and message if the field name is minMax', () => {
			const expectedResult = {cls: 'errorClass', msg: 'Username already exists'};
			const {cls, msg} = getErrors('errorClass', 'duplicate', {fieldName:'Username'});
			expect(cls).toBe(expectedResult.cls);
			expect(msg).toBe(expectedResult.msg);
		})
		it('returns the correct class and message if the type is authentication', () => {
			const expectedResult = {cls: 'errorClass'};
			const {msg, cls} = getErrors('errorClass', 'authentication');
			expect(cls).toBe(expectedResult.cls);
			expect(msg).toBe('Invalid authorization');
		})
		it('returns null if the errorType is not specified', () => {
			const expectedResult = null;
			const returnError = getErrors();
			expect(returnError).toBe(null);
		})

	})
	describe('isEmpty', () => {
		it('returns true if an object is empty', () => {
			expect(isEmpty({})).toBe(true);
		})
		it('returns true if an object is empty', () => {
			expect(isEmpty({key: 'val'})).toBe(false);
		})
	})
})