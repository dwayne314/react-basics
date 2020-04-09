// Utility Dependencies
import * as auth from './auth'
import axios from 'axios';
import { createMockStore } from '../../test-utils';


describe('actions', () => {
	
	const axiosMock = jest.spyOn(axios, 'post');
	const store = createMockStore([], {});

	// const mockDispatch = jest.fn();


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
		axiosMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved('');
	        }));

		await auth.registerUser('user')(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosMock).toHaveBeenCalledWith('/api/register', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_LOADING');
		expect(storeActions[1].payload).toBe(false);
	})
	it('registerUser dispatches the correct actions if the post is rejected', async () => {
		const errorMessage = 'post error'
		axiosMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMessage}});
	        }));

		await auth.registerUser('user')(store.dispatch)		
		const storeActions = store.getActions();

		expect(axiosMock).toHaveBeenCalledWith('/api/register', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_ERRORS');
		expect(storeActions[1].payload).toBe(errorMessage);
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
	it('loginUser dispatches the correct actions if the post is successful', async () => {
		axiosMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            resolved({data: 'user data'});
	        }));

		await auth.loginUser('user')(store.dispatch)
		const storeActions = store.getActions();
		
		expect(axiosMock).toHaveBeenCalledWith('/api/login', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_USER');
		expect(storeActions[1].payload).toBe('user data');
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
	it('loginUser dispatches the correct actions if the post is rejected', async () => {
		const errorMessage = 'post error'
		axiosMock.mockImplementationOnce(
	        () => new Promise((resolved, rejected) =>{
	            rejected({response: {data: errorMessage}});
	        }));

		await auth.loginUser('user')(store.dispatch)		
		const storeActions = store.getActions();

		expect(axiosMock).toHaveBeenCalledWith('/api/login', expect.any(String));
		expect(storeActions[0].type).toBe('SET_LOADING');
		expect(storeActions[0].payload).toBe(true);
		expect(storeActions[1].type).toBe('SET_ERRORS');
		expect(storeActions[1].payload).toBe(errorMessage);
		expect(storeActions[2].type).toBe('SET_LOADING');
		expect(storeActions[2].payload).toBe(false);
	})
})