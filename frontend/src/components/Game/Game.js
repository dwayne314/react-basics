// Library Dependencies
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from '../../utils/utils';

// App Dependencies
import Position from '../Position/Position';

// Utility Dependencies
import {
	createGameOver,
	makeMove,
	changeHumanIcon,
	setGameOverStatus,
	setComputerMove,
	toggleFlash,
	saveGameStatus
} from '../../redux/actions/actions';
import {
	getGameBoard,
	getHumanIcon,
	getCpuIcon,
	isGameOver,
	isComputerMove,
	getCurrentUser,
	getLastFirstMove,
	isSessionSaved
} from '../../redux/selectors/selectors';
import { 
	getLocation, 
	getPositionIcon, 
	checkGameOver, 
	makeRandomComputerMove,
	getPositionStatusClass
} from '../../utils/TicTacToe/TicTacToe';

// Styles
import './Game.css';


const Game = (props) => {
	const { mode } = props;
	const board = useSelector(getGameBoard);
	
	const userIconRef = useSelector(getHumanIcon);
	const cpuIcon = useSelector(getCpuIcon);
	const gameOver = useSelector(isGameOver);
	const computerMoveTrue = useSelector(isComputerMove);
	const userLoggedIn = useSelector(getCurrentUser);
	const lastFirstMove = useSelector(getLastFirstMove);
	const saveSessionTrue = useSelector(isSessionSaved);
	
	const dispatch = useDispatch();

	const handleMakeMove = useCallback((location, icon) => {
		dispatch(makeMove(location, icon));
		const gameTerminated = checkGameOver(board);

		if (gameTerminated) {
			let status;
			dispatch(setGameOverStatus(gameTerminated));

			if (gameTerminated.winner) {
				status = (mode === 0 && computerMoveTrue) ? -1 : 1;
				const winStatus = (mode === 0 && computerMoveTrue) ? 3 : 1;
				dispatch(toggleFlash(`${gameTerminated.winner} won`, winStatus))	
			}
			else {
				dispatch(toggleFlash('Its a tie', 1))	
			}
			if (mode === 0) {
				dispatch(createGameOver(gameTerminated.winner, userIconRef, cpuIcon));

				if (!isEmpty(userLoggedIn) && saveSessionTrue) {
					dispatch(saveGameStatus(status, lastFirstMove, 0))	
				}	
			}
			
			

		}
	}, [board, dispatch, userIconRef, cpuIcon, computerMoveTrue, mode, lastFirstMove, userLoggedIn]);

	const onClick = (id) => {
		if (!computerMoveTrue && !gameOver) {
			const location = getLocation(id);
			if (!getPositionIcon(location, board)) {
				handleMakeMove(location, userIconRef);
				if (mode === 0) {
					dispatch(setComputerMove(true));
				}
				else {
					dispatch(changeHumanIcon());
				}	
			}
		}
	};

	const mergeBoard = (index) => {
		const location = getLocation(index);
		let isWinningLocation = (gameOver && gameOver.winner) ? gameOver.location.filter((combo) => {
				return JSON.stringify(combo) === JSON.stringify(location);
			}) : [];
		let statusClass = '';

		if (gameOver && isWinningLocation.length) {
 			statusClass = getPositionStatusClass(mode, userIconRef, gameOver.winner);
		}
			
		return {
			text: board[location.x][location.y],
			status: statusClass
		};
	};

	useEffect(() => {
		let mounted = true;
		if (computerMoveTrue && !gameOver && mounted) {

			mounted = setTimeout(() => {
				const location = makeRandomComputerMove(board);
				dispatch(setComputerMove(false));
				handleMakeMove(location, cpuIcon);
			}, 500);
		}
		return () => clearTimeout(mounted);

	}, [computerMoveTrue, gameOver, board, handleMakeMove, cpuIcon, dispatch]);

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
