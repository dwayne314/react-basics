// App Dependencies
import { getRandomNumber, getErrors, isEmpty } from './utils';


describe('Utils', () => {

	describe('getRandomNumber', () => {
		it('function contains both boundary numbers', () => {
			const randomNumbers = [];
			for (let i=0; i<201; i++) {
				const newRandomNumber = getRandomNumber(0, 3);
				randomNumbers.push(newRandomNumber);
			}
			
			const randomContainsBoundaries = new Set(randomNumbers.filter(num => num === 0 || num === 3));
			expect([...randomContainsBoundaries].length).toBe(2);


		})
		it('getRandomNumber contains both boundary numbers', () => {
			const randomNumbers = []
			for (let i=0; i<201; i++) {
				const newRandomNumber = getRandomNumber(0, 3);
				randomNumbers.push(newRandomNumber);
			}
			expect([...new Set(randomNumbers)].length).toBe(4);
		})	
	})
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


