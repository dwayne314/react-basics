// Library Dependencies
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// App Dependencies
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

// Utility Dependencies
import { toggleHamburgerMenu } from '../../redux/actions/actions';
import { hamburgerMenuHiddenCls, getCurrentUser } from '../../redux/selectors/selectors';
import { isEmpty } from '../../utils/utils';

// Styles
import './Header.css';

// Images
import hamburgerMenu from '../../static/hamburger.png'


const Header = () => {
	const dispatch = useDispatch();

	const hiddenCls = useSelector(hamburgerMenuHiddenCls)
	const userLoggedIn = useSelector(getCurrentUser);
	const hamburgerMenuIconRef = useRef(null);

	const handleHamburgerMenuClick = () => {
		dispatch(toggleHamburgerMenu(hiddenCls))
	}
	

	return (
		<div className="header-container">
			<div className="title-container">
				<div data-testid="title-header" className="title">
					<Link to="/">		
						Tic-Tac-Toe
					</Link>
				</div>
			</div>
			<span className="header-links-container">
				<div className="header-links">
					{isEmpty(userLoggedIn) ? 
						<Link to="/login">
							<span data-testid="login-header" className="header-link">Login</span>
						</Link> 
						:
						<Link to="/logout">
							<span data-testid="logout-header" className="header-link">Logout</span>
						</Link>
					}
					<Link to="/settings">
						<span data-testid="settings-header" className="header-link">Settings</span>
					</Link>
				</div>
			</span>
			<span data-testid="hamburger-menu-icon" ref={hamburgerMenuIconRef} className="mobile-settings-menu" onClick={handleHamburgerMenuClick}>
				<img src={hamburgerMenu} alt="settings-menu"/>
			</span>

			<HamburgerMenu hamburgerMenuIcon={hamburgerMenuIconRef.current}/>
		</div>
	);
};


export default Header;
