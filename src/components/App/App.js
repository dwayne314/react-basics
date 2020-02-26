import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Settings from '../Settings/Settings';
import { store } from '../../redux/store/store';


const App = () => {
	return (
		<Provider store={store}>
			<div className="app">
				<Header />
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/login" component={Login}></Route>
				<Route exact path="/settings" component={Settings}></Route>
			</div>
		</Provider>
	);
};


export default App;
