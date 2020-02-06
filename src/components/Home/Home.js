import React from 'react';
import Game from '../Game/Game';
import './Home.css';

const Home = () => {
	return (
		<div className="home-container">
			<div className="home-title">
				Human vs Computer
			</div>
			<Game />
		</div>
	);
};


export default Home;
