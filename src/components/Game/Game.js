import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createGameOver } from '../../redux/actions/actions';
import Position from '../Position/Position';

// Utilities
import { 
	getLocation, 
	getPositionIcon, 
	checkGameOver, 
	makeRandomComputerMove } from '../../utils/TicTacToe/TicTacToe';

// Styles
import './Game.css';

const Game = (props) => {
	const { mode, firstMove='human' } = props;
	const [board, updateBoard] = useState([
		[[], [], []],
		[[], [], []],
		[[], [], []]
		])
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isComputerMove, setComputerMove] = useState(
		(firstMove === 'human') ? false : true);
	const [isGameOver, setGameOver] = useState(false);
	const userIconRef = useRef(firstMove === 'human' ? 'X' : 'O');

	const dispatch = useDispatch();

	const makeMove = useCallback((location) => {
		setCurrentPlayer(currentPlayer => {
			return (currentPlayer === 'X') ? 'O' : 'X';
		});
		const newBoard = [...board];
		newBoard[location.x][location.y] = currentPlayer;
		updateBoard(newBoard);

		const gameTerminated = checkGameOver(board)
		if (gameTerminated && gameTerminated.winner) {
			setGameOver(gameTerminated);
			alert(gameTerminated.winner);

			dispatch(createGameOver(gameTerminated.winner));
		}
		else if (gameTerminated && !gameTerminated.winner) {
			setGameOver(gameTerminated);
			alert('its a tie');
			dispatch(createGameOver());
		}
	}, [board, currentPlayer, dispatch]);

	const onClick = (id) => {
		if (!isComputerMove && !isGameOver) {
			const location = getLocation(id);
			if (!getPositionIcon(location, board)) {
				makeMove(location);
				if (mode === 0) {
					setComputerMove(true);
				}	
			}
		}
	};

	const mergeBoard = (index) => {
		const location = getLocation(index);
		let isWinningLocation = (isGameOver && isGameOver.winner) ? isGameOver.location.filter((combo) => {
				return JSON.stringify(combo) === JSON.stringify(location)
			}) : [];
		let statusClass = '';

		if (isGameOver && isWinningLocation.length) {
			const cpuPlayingWinStatus = props.mode === 1 ? ' winner' : ' loser';
			statusClass = userIconRef.current === isGameOver.winner && cpuPlayingWinStatus ? ' winner' : cpuPlayingWinStatus
		}
			
		return {
			text: board[location.x][location.y],
			status: statusClass
		};
	};

	useEffect(() => {
		if (isComputerMove && !isGameOver) {

			setTimeout(() => {
				const location = makeRandomComputerMove(board);
				setComputerMove(false);
				makeMove(location);	
			}, 500)
		}
	}, [currentPlayer, isComputerMove, isGameOver, board, makeMove]);

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
