// App Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Utility Dependencies
import { hamburgerMenuHiddenCls } from '../../redux/selectors/selectors';
import { getCurrentUser } from '../../redux/selectors/selectors';
import { isEmpty } from '../../utils/utils';

// Styles
import './HamburgerMenu.css';


const HamburgerMenu = () => {

	const hiddenCls = useSelector(hamburgerMenuHiddenCls);
	const userLoggedIn = useSelector(getCurrentUser);

	return (
		<div data-testid = "hamburger-menu-container" className="hamburger-menu-container">
			<div data-testid="hamburger-menu" className={`hamburger-menu${hiddenCls}`}>
				<div className="hamburger-menu-header-container">
					<div className="hamburger-menu-header">
						Menu
					</div>
				</div>
				<div className="hamburger-menu-line">
					<Link to="/settings">
						Settings
					</Link>
				</div>
				<div className="hamburger-menu-line">
				{isEmpty(userLoggedIn) ? 
						<Link to="/login">
							<span data-testid="login" className="header-link">Login</span>
						</Link> 
						:
						<Link to="/logout">
							<span data-testid="logout" className="header-link">Logout</span>
						</Link>
					}
				</div>
			</div>
		</div>
	);
};


export default HamburgerMenu;
