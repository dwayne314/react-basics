// App Dependencies
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Utility Dependencies
import { toggleHamburgerMenu } from '../../redux/actions/actions';
import { hamburgerMenuHiddenCls, getCurrentUser } from '../../redux/selectors/selectors';
import { isEmpty } from '../../utils/utils';

// Styles
import './HamburgerMenu.css';


const HamburgerMenu = (props) => {

	const openHamburgerMenuCls = '';
	const hamburgerMenuRef = useRef(null);
	const hiddenCls = useSelector(hamburgerMenuHiddenCls);
	const userLoggedIn = useSelector(getCurrentUser);

	const dispatch = useDispatch();

	const closeHamburgerMenu = (evt) => {
		if (!hamburgerMenuRef.current.contains(evt.target) && hiddenCls === openHamburgerMenuCls) {
			dispatch(toggleHamburgerMenu(''));
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeHamburgerMenu);

		return () => {
			document.removeEventListener('click', closeHamburgerMenu);
		}
	});

	return (
		<div data-testid="hamburger-menu-container" className="hamburger-menu-container">
			<div data-testid="hamburger-menu" ref={hamburgerMenuRef} className={`hamburger-menu${hiddenCls}`}>
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
