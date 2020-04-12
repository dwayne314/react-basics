module.exports = {
	getMockResponse: () => {
		const res = {};
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);
		return res;
	},
	getMockRequest: (body={}, isAuthenticated={}) => {
		const req = {};
		req.body = jest.fn().mockReturnValue(body);
		req.logout = jest.fn().mockReturnValue(req);
		req.isAuthenticated = jest.fn().mockReturnValueOnce(isAuthenticated);
		return req
	}
}