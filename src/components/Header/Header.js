import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
	return (
		<div className="header-container">
			<div className="title-container">
				<div className="title">
					<Link to="/">		
						Tic-Tac-Toe
					</Link>
				</div>
			</div>
			<span className="header-links-container">
				<div className="header-links">
					<Link to="/login">
						<span className="header-link">Login</span>
					</Link>
					<Link to="/settings">
						<span className="header-link">Settings</span>
					</Link>
				</div>

			</span>
		</div>
	);
};


export default Header;
