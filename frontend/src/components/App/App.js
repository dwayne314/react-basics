// Library Dependencies
import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// App Dependencies
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Signup from '../Signup/Signup';
import Settings from '../Settings/Settings';
import LoggedInBanner from '../LoggedInBanner/LoggedInBanner';

// Utility Dependencies
import { store } from '../../redux/store/store';


const App = () => {
	return (
		<Provider store={store}>
			<div className="app">
				<LoggedInBanner />
				<Header />
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/register" component={Signup}></Route>
				<Route exact path="/settings" component={Settings}></Route>
				<Route exact path="/login" component={Login}></Route>
				<Route exact path="/logout" component={Logout}></Route>
			</div>
		</Provider>
	);
};


export default App;
