import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './Header.css';

const Header = () => {
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
		</div>
	);
};


export default Header;
