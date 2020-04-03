// App Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles
import './Signup.css';


const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const updateUsername = (evt) => {
		setUsername(evt.target.value)
	}

	const updatePassword = (evt) => {
		setPassword(evt.target.value)
	}

	const submitForm = () => {
		console.log(username, ' ', password)
	}

	return (
		<div data-testid="signup-container" className="signup-container">
			<div className="form-container">
				<div className="form-input-container">
					<div className="form-label">
						<label htmlFor="username">
							Username
						</label>
					</div>
					<div htmlFor="username" className="form-input">
						<input data-testid="username-input" onChange={updateUsername} type="text" 
						value={username}></input>
					</div>
				</div>
				<div className="form-input-container">
					<div className="form-label">
						<label htmlFor="password">
							Password
						</label>
					</div>
					<div htmlFor="password" className="form-input">
						<input data-testid="password-input" onChange={updatePassword} type="text" 
						value={password}></input>
					</div>
				</div>
				<div className="form-button-container">
					<div data-testid="submit-button" onClick={submitForm} className="form-submit">Submit</div>
				</div>
			</div>

		</div>
	);
};


export default Signup;
