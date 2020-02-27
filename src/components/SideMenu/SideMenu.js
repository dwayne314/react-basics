import React from 'react';
import { useSelector } from 'react-redux';
import { getGameMode } from '../../redux/selectors/selectors';


const SideMenu = (props) => {
	const {mode, wins, losses, ties, updateGameMode} = props;

	return (
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
					<div data-testid="game-mode-human" onClick={()=> updateGameMode(1)} 
					className={`settings-box-section${(mode === 1 ? " settings-box-chosen" : "")}`}>
						<div className="settings-box-text">
							H v H
						</div>
					</div>
					<div data-testid="game-mode-cpu" onClick={()=> updateGameMode(0)} 
					className={`settings-box-section${(mode === 0 ? " settings-box-chosen" : "")}`}>
						<div className="settings-box-text">
							CPU v H
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default SideMenu;
