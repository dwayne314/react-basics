// Library Dependencies
import React, { useEffect, useCallback } from 'react';
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
import FlashMessage from '../FlashMessage/FlashMessage';


const App = () => {

	const location = useLocation();
	const hiddenCls = useSelector(hamburgerMenuHiddenCls);
	const dispatch = useDispatch();

	const closeHamburgerMenu = useCallback(() => {
		dispatch(toggleHamburgerMenu(''))
	}, [dispatch])

	useEffect(() => {
		if (hiddenCls) {
			closeHamburgerMenu()
		}
	}, [hiddenCls, closeHamburgerMenu])

	useEffect(() => {
		closeHamburgerMenu()
	}, [location.pathname, closeHamburgerMenu])

	useEffect(() => {
	    window.addEventListener("resize", closeHamburgerMenu);
	    return () => window.removeEventListener("resize", closeHamburgerMenu);
	});

	return (
			<div className="app">
				<FlashMessage />
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
