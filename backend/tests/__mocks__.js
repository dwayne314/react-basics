module.exports = {
	getMockResponse: () => {
		const res = {};
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);
		return res;
	},
	getMockRequest: () => {
		const res = {};
	}
}