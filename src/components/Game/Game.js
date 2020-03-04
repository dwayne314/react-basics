// Library Dependencies
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// App Dependencies
import Position from '../Position/Position';

// Utility Dependencies
import { createGameOver, makeMove, changeHumanIcon } from '../../redux/actions/actions';
import { getGameBoard, getHumanIcon, getCpuIcon } from '../../redux/selectors/selectors';
import { 
	getLocation, 
	getPositionIcon, 
	checkGameOver, 
	makeRandomComputerMove } from '../../utils/TicTacToe/TicTacToe';

// Styles
import './Game.css';


const Game = (props) => {
	const { mode, firstMove='human' } = props;
	const board = useSelector(getGameBoard);
	const [isComputerMove, setComputerMove] = useState(
		(firstMove === 'human') ? false : true);
	
	const [isGameOver, setGameOver] = useState(false);
	const userIconRef = useSelector(getHumanIcon);
	const cpuIcon = useSelector(getCpuIcon);

	const dispatch = useDispatch();

	const handleMakeMove = useCallback((location, icon) => {
		dispatch(makeMove(location, icon));
		const gameTerminated = checkGameOver(board);

		if (gameTerminated) {
			setGameOver(gameTerminated);

			if (gameTerminated.winner) {
				alert(gameTerminated.winner);
				dispatch(createGameOver(gameTerminated.winner));
			}
			else {
				alert('its a tie');
				dispatch(createGameOver());
			}
		}

	}, [board, dispatch]);

	const onClick = (id) => {
		if (!isComputerMove && !isGameOver) {
			const location = getLocation(id);
			if (!getPositionIcon(location, board)) {
				handleMakeMove(location, userIconRef);
				if (mode === 0) {
					setComputerMove(true);
				}
				else {
					dispatch(changeHumanIcon());
				}	
			}
		}
	};

	const mergeBoard = (index) => {
		const location = getLocation(index);
		let isWinningLocation = (isGameOver && isGameOver.winner) ? isGameOver.location.filter((combo) => {
				return JSON.stringify(combo) === JSON.stringify(location);
			}) : [];
		let statusClass = '';

		if (isGameOver && isWinningLocation.length) {
			const cpuPlayingWinStatus = props.mode === 1 ? ' winner' : ' loser';
			statusClass = userIconRef === isGameOver.winner && cpuPlayingWinStatus ? ' winner' : cpuPlayingWinStatus;
		}
			
		return {
			text: board[location.x][location.y],
			status: statusClass
		};
	};
	useEffect(() => {
		let mounted = true;
		if (isComputerMove && !isGameOver && mounted) {

			mounted = setTimeout(() => {
				const location = makeRandomComputerMove(board);
				setComputerMove(false);
				handleMakeMove(location, cpuIcon);
			}, 500);
		}
		return () => clearTimeout(mounted);

	}, [isComputerMove, isGameOver, board, handleMakeMove, cpuIcon]);

	return (
		<div className="game-container">
			<div data-testid="game" className="game">
				<div data-testid="col-1" className="row">
					<Position mergeBoard={mergeBoard} id={0} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={1} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={2} onClick={onClick} />
				</div>
				<div data-testid="col-2" className="row">
					<Position mergeBoard={mergeBoard} id={3} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={4} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={5} onClick={onClick} />
				</div>
				<div data-testid="col-3" className="row">
					<Position mergeBoard={mergeBoard} id={6} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={7} onClick={onClick} />
					<Position mergeBoard={mergeBoard} id={8} onClick={onClick} />
				</div>
			</div>
		</div>
	);
};


export default Game;
