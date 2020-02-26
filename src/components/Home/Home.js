import React from 'react';
import { useSelector } from 'react-redux';

import { getWins, getLosses, getTies } from '../../redux/selectors/selectors';
import Game from '../Game/Game';

// Styles
import './Home.css';

const Home = () => {

	const wins = useSelector(getWins)
	const losses = useSelector(getLosses)
	const ties = useSelector(getTies)
	return (
		<div className="home-container">
			<div data-testid="home-title" className="home-title">
				Human vs Computer
			</div>
			<Game mode={0} />
			<div className="side-menu-container">
				<div className="side-menu-section">
					<div className="side-menu-title">Score Board</div>
					<div className="scoreboard-container">
						
						<div className="scoreboard-section">
							<div className="scoreboard-title">
								Wins
							</div>
							<div data-testid="win-counter" className="scoreboard-score">
								{ wins }
							</div>
						</div>

						<div className="scoreboard-section">
							<div className="scoreboard-title">
								Losses
							</div>
							<div data-testid="loss-counter" className="scoreboard-score">
								{ losses }
							</div>
						</div>
						<div className="scoreboard-section">
							<div className="scoreboard-title">
								Ties
							</div>
							<div data-testid="tie-counter" className="scoreboard-score">
								{ ties }
							</div>
						</div>
					</div>
				</div>
				<div className="side-menu-section">
					<div className="side-menu-title">Game Order</div>
					<div className="settings-box-container">
						<div className="settings-box-section">
							<div className="settings-box-text angled-text">
								Human
							</div>
						</div>
						<div className="settings-box-section">
							<div className="settings-box-text angled-text">
								CPU
							</div>
						</div>
						<div className="settings-box-section">
							<div className="settings-box-text angled-text">
								Alternate
							</div>
						</div>

					</div>
				</div>
				<div className="side-menu-section">
					<div className="side-menu-title">Game Mode</div>
					<div className="settings-box-container">
						<div className="settings-box-section">
							<div className="settings-box-text">
								H v H
							</div>
						</div>
						<div className="settings-box-section">
							<div className="settings-box-text">
								CPU v CPU
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};


export default Home;
