import React from 'react';
import Game from '../Game/Game';

// Styles
import './Home.css';

const Home = () => {
	return (
		<div className="home-container">
			<div data-testid="home-title" className="home-title">
				Human vs Computer
			</div>
			<Game mode={0} />
		</div>
	);
};


export default Home;
