// Library Dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



// App Dependencies
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

// Utility Dependencies
import { toggleHamburgerMenu } from '../../redux/actions/actions';
import { hamburgerMenuHiddenCls } from '../../redux/selectors/selectors';

// Styles
import './Header.css';

// Images
import hamburgerMenu from '../../static/hamburger.png'


const Header = () => {
	const dispatch = useDispatch();

	const hiddenCls = useSelector(hamburgerMenuHiddenCls)

	const handleHamburgerMenuClick = () => {
		dispatch(toggleHamburgerMenu(hiddenCls))
	}

	return (
		<div className="header-container">
			<div className="title-container">
				<div data-testid="title" className="title">
					<Link to="/">		
						Tic-Tac-Toe
					</Link>
				</div>
			</div>
			<span className="header-links-container">
				<div className="header-links">
					<Link to="/login">
						<span data-testid="login" className="header-link">Login</span>
					</Link>
					<Link to="/settings">
						<span data-testid="settings" className="header-link">Settings</span>
					</Link>
				</div>
			</span>
			<span data-testid="hamburger-menu-icon" className="mobile-settings-menu" onClick={handleHamburgerMenuClick}>
				<img src={hamburgerMenu} alt="settings-menu"/>
			</span>

			<HamburgerMenu/>
		</div>
	);
};


export default Header;
