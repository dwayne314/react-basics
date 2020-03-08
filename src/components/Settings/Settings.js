// App Dependencies
import React, { useState, useEffect } from 'react';

// Styles
import './Settings.css'

const Settings = () => {

	const [isAIActive, setAIActive] = useState(false);
	const [isSessionSaved, setSessionSave] = useState(false);

	const handleActiveAICheckbox = (evt) => {
		setAIActive(isAIActive ? false : true);
	}

	const handleSaveSessionCheckbox = (evt) => {
		setSessionSave(isSessionSaved ? false : true);
	}

	const handleResetScore = (evt) => {
		console.log('dispatching score reset')
	}

	useEffect(() => {
		console.log('AI active: ' + isAIActive)
		console.log('Is session saved: ' + isSessionSaved)
	}, [isAIActive, isSessionSaved])

	return (
		<div data-testid = "settings-container" className="settings-container">
			<label htmlFor="active-ai">
				<div className="settings-line-container">
					<div className="settings-line-text">
							AI Computer Active
					</div>
					<div className="settings-line-input">
						<input id="active-ai" type="checkbox" onChange={handleActiveAICheckbox} checked={isAIActive}></input>
					</div>
				</div>
			</label>

			<label htmlFor="record-score">
				<div className="settings-line-container">
					<div className="settings-line-text">
							Record Session Score
					</div>
					<div className="settings-line-input">
						<input id="record-score" type="checkbox" onChange={handleSaveSessionCheckbox} checked={isSessionSaved}></input>
					</div>
				</div>
			</label>
			<div className="settings-button-container" onClick={handleResetScore}>
				Reset Score
			</div>

		</div>
	);
};


export default Settings;
