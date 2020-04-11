// Library Dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router';

// Utility Dependencies
import { toggleHamburgerMenu } from '../../redux/actions/actions';
import { hamburgerMenuHiddenCls } from '../../redux/selectors/selectors';

// App Dependencies
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Signup from '../Signup/Signup';
import Settings from '../Settings/Settings';
import LoggedInBanner from '../LoggedInBanner/LoggedInBanner';


const App = () => {

	const location = useLocation();
	const hiddenCls = useSelector(hamburgerMenuHiddenCls);
	const dispatch = useDispatch();
	const windowWidth = window.innerWidth;

	const closeHamburgerMenu = () => {
		dispatch(toggleHamburgerMenu(''));
	}

	useEffect(() => {
		if (hiddenCls) {
			closeHamburgerMenu()
		}
	}, [location.pathname])

	useEffect(() => {
	    window.addEventListener("resize", closeHamburgerMenu);
	    return () => window.removeEventListener("resize", closeHamburgerMenu);
	});

	return (
			<div className="app">
				<LoggedInBanner />
				<Header />
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/register" component={Signup}></Route>
				<Route exact path="/settings" component={Settings}></Route>
				<Route exact path="/login" component={Login}></Route>
				<Route exact path="/logout" component={Logout}></Route>
			</div>
	);
};


export default App;
