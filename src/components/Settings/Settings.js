// App Dependencies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Utility Dependencies
import { toggleAIActive, toggleSaveSession, resetScore } from '../../redux/actions/actions';
import { isAIActive, isSessionSaved } from '../../redux/selectors/selectors';

// Styles
import './Settings.css'


const Settings = () => {

	const activeAI = useSelector(isAIActive);
	const sessionSaved = useSelector(isSessionSaved);
	const dispatch = useDispatch();

	const handleActiveAICheckbox = (evt) => {
		dispatch(toggleAIActive(activeAI ? false : true));
	}

	const handleSaveSessionCheckbox = (evt) => {
		dispatch(toggleSaveSession(sessionSaved ? false : true));
	}

	const handleResetScore = (evt) => {
		dispatch(resetScore());
	}

	return (
		<div data-testid="settings-container" className="settings-container">
			<label htmlFor="active-ai">
				<div className="settings-line-container">
					<div className="settings-line-text">
							AI Computer Active
					</div>
					<div className="settings-line-input">
						<input data-testid="active-ai-button" id="active-ai" type="checkbox" onChange={handleActiveAICheckbox} checked={activeAI}></input>
					</div>
				</div>
			</label>

			<label htmlFor="record-score">
				<div className="settings-line-container">
					<div className="settings-line-text">
							Record Session Score
					</div>
					<div className="settings-line-input">
						<input data-testid="record-session-button" id="record-score" type="checkbox" onChange={handleSaveSessionCheckbox} checked={sessionSaved}></input>
					</div>
				</div>
			</label>
			<div data-testid='reset-score-button' className="settings-button-container" onClick={handleResetScore}>
				Reset Score
			</div>
		</div>
	);
};


export default Settings;
