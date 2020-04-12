// Utility Dependencies
import * as auth from './auth'
import axios from 'axios';
import { createMockStore } from '../../test-utils';


describe('actions', () => {
	
	const axiosPostMock = jest.spyOn(axios, 'post');
	const axiosGetMock = jest.spyOn(axios, 'get');
	const store = createMockStore([], {});

	const logMock = jest.spyOn(window.console, 'log');


	afterEach(() => {
		jest.resetAllMocks();
		store.clearActions();
	})
	it('setLoading returns the correct action', () => {
		const action =  {
			type: auth.SET_LOADING,
			payload: true
		};
		expect(auth.setLoading(true)).toEqual(action);
	})
	it('setErrors returns all errors', () => {
		const error = {type: 'auth', msg: 'auth error'}
		const action = {
			type: auth.SET_ERRORS,
			payload: error
		}
		expect(auth.setErrors(error)).toEqual(action);

	})
	it('registerUser dispatches the correct actions if the post is successful', async () => {
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved('');
	        }));

		await auth.registerUser('user')(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosPostMock).toHaveBeenCalledWith('/api/register', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_LOADING');
		expect(storeActions[1].payload).toBe(false);
	})
	it('registerUser dispatches the correct actions if the post is rejected', async () => {
		const errorMessage = 'post error'
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMessage}});
	        }));

		await auth.registerUser('user')(store.dispatch)		
		const storeActions = store.getActions();

		expect(axiosPostMock).toHaveBeenCalledWith('/api/register', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_ERRORS');
		expect(storeActions[1].payload).toBe(errorMessage);
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
	it('loginUser dispatches the correct actions if the post is successful', async () => {
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved({data: 'user data'});
	        }));

		await auth.loginUser('user')(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosPostMock).toHaveBeenCalledWith('/api/login', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_USER');
		expect(storeActions[1].payload).toBe('user data');
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
	it('loginUser dispatches the correct actions if the post is rejected', async () => {
		const errorMessage = 'post error'
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMessage}});
	        }));

		await auth.loginUser('user')(store.dispatch)		
		const storeActions = store.getActions();

		expect(axiosPostMock).toHaveBeenCalledWith('/api/login', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_ERRORS');
		expect(storeActions[1].payload).toBe(errorMessage);
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
	it('logoutUser dispatches the correct actions if the post is successful', async () => {
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved({});
	        }));

		await auth.logoutUser()(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosPostMock).toHaveBeenCalledWith('/api/logout');
		expect(storeActions[0].type).toBe('SET_USER');
		expect(storeActions[0].payload).toStrictEqual({});
	})
	it('logoutUser dispatches the correct actions if the post is rejected', async () => {
		const errorMessage = 'post error'
		axiosPostMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMessage}});
	        }));

		await auth.logoutUser()(store.dispatch)		
		const storeActions = store.getActions();

		expect(axiosPostMock).toHaveBeenCalledWith('/api/logout');
		expect(storeActions[0].type).toBe('SET_ERRORS');
		expect(storeActions[0].payload).toBe(errorMessage);
	})
	it('initializeGames dispatches the correct actions if the get is successful', async () => {
		axiosGetMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved({data: [{_id: 1, status: 1}, {_id: 2, status: -1}]});
	        }));

		await auth.fetchGames()(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosGetMock).toHaveBeenCalledWith('/api/games');
		expect(storeActions[0].type).toBe('INITIALIZE_GAMES');
		expect(storeActions[0].payload.games).toStrictEqual([1, -1]);
	})
	it('initializeGames dispatches the correct actions if the get is rejected', async () => {
		const errorMsg = 'Error';
		axiosGetMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected(errorMsg);
	        }));

		await auth.fetchGames()(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosGetMock).toHaveBeenCalledWith('/api/games');
		expect(logMock).toHaveBeenCalledWith('Error getting games!')
	})
})