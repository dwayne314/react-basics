import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store'; 


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
