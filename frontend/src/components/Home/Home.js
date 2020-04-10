// Library Dependencies
import React, from 'react';
import { useSelector, useDispatch } from 'react-redux';

// App Dependencies
import Game from '../Game/Game';
import SideMenu from '../SideMenu/SideMenu';

// Utility Dependencies
import { getWins, getLosses, getTies, getGameMode, isGameOver, getGameOrder } from '../../redux/selectors/selectors';
import { changeGameMode, clearBoard, changeGameOrder } from '../../redux/actions/actions';

// Styles
import './Home.css';

const Home = () => {

	const wins = useSelector(getWins);
	const losses = useSelector(getLosses);
	const ties = useSelector(getTies);
	const gameMode = useSelector(getGameMode);
	const gameOver = useSelector(isGameOver)
	const gameOrder = useSelector(getGameOrder)

	const dispatch = useDispatch();

	const updateGameMode = mode => {
		dispatch(changeGameMode(mode));
		dispatch(clearBoard());
	};

	const updateGameOrder = order => {
		dispatch(changeGameOrder(order));
		dispatch(clearBoard());
	};

	return (
		<div className="home-container">
			<div data-testid="home-title" className="home-title">
				Human vs Computer
			</div>
			<Game mode={gameMode} />
			<SideMenu
				mode={gameMode}
				wins={wins}
				losses={losses}
				ties={ties}
				updateGameMode={updateGameMode}
				gameOver={gameOver}
				updateGameOrder={updateGameOrder}
				gameOrder={gameOrder}/>
		</div>
	);
};


export default Home;
