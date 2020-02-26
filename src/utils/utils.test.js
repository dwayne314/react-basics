import { getRandomNumber } from './utils';


describe('Utils', () => {
	it('getRandomNumber contains both boundary numbers', () => {
		const randomNumbers = []
		for (let i=0; i<201; i++) {
			const newRandomNumber = getRandomNumber(0, 3)
			randomNumbers.push(newRandomNumber)
		}
		
		const randomContainsBoundaries = new Set(randomNumbers.filter(num => num === 0 || num === 3));
		expect([...randomContainsBoundaries].length).toBe(2);


	})
	it('getRandomNumber contains both boundary numbers', () => {
		const randomNumbers = []
		for (let i=0; i<201; i++) {
			const newRandomNumber = getRandomNumber(0, 3)
			randomNumbers.push(newRandomNumber)
		}

		expect([...new Set(randomNumbers)].length).toBe(4)
	})
})