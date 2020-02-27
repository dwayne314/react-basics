import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store'; 
import configureMockStore from 'redux-mock-store';


export const wrapRouter = (component, route='/') => {
	return (props => (
		<MemoryRouter initialEntried={[route]}>
			component
		</MemoryRouter>
	))
}

export const wrapProvider = (Component) => (
		<Provider store={store}>
			{ Component }
		</Provider>
);

export const createMockStore = (middlewares=[], initialState={}) => {
	let mockStore = configureMockStore(middlewares);
	const store = mockStore(initialState);
	return store;
}