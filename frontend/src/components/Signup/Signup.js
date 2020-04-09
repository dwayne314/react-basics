// App Dependencies
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from '../../validators/auth';
import { registerUser, setErrors } from '../../redux/actions/auth';
import { getErrors } from '../../redux/selectors/selectors'

// Styles
import './Signup.css';


const Signup = () => {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const errors = useSelector(getErrors)

	const updateFirstName = (evt) => {
		setFirstName(evt.target.value)
	}

	const updateLastName = (evt) => {
		setLastName(evt.target.value)
	}

	const updateUsername = (evt) => {
		setUsername(evt.target.value)
	}

	const updatePassword = (evt) => {
		setPassword(evt.target.value)
	}

	const submitForm = (e) => {
		e.preventDefault();
		
		dispatch(setErrors({}));		
		const userAttrs = {first_name, last_name, username, password};
		const {errors, result, isValid } = validate.registration(userAttrs);
		if (!isValid) {
			dispatch(setErrors(errors));
		}
		else {
			dispatch(registerUser(result))
		}
	}

	return (
		<div data-testid="signup-container" className="signup-container">
			<div className="form-container">
				<div className="form-input-container">
					<div className="form-label">
						<label htmlFor="first_name">
							First Name
						</label>
					</div>
					<div htmlFor="first_name" className="form-input">
						<input data-testid="firstName-input" onChange={updateFirstName} type="text" 
						value={first_name}></input>
					</div>
					{(errors.first_name) ? <span data-testid="first-name-error" className="form-error">{errors.first_name.msg}</span> : ""}
				</div>
				<div className="form-input-container">
					<div className="form-label">
						<label htmlFor="last_name">
							Last Name
						</label>
					</div>
					<div htmlFor="last_name" className="form-input">
						<input data-testid="lastName-input" onChange={updateLastName} type="text" 
						value={last_name}></input>
					</div>
					{(errors.last_name) ? <span data-testid="last-name-error" className="form-error">{errors.last_name.msg}</span> : ""}					
				</div>
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
					{(errors.username) ? <span data-testid="username-error" className="form-error">{errors.username.msg}</span> : ""}
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
					{(errors.password) ? <span data-testid="password-error" className="form-error">{errors.password.msg}</span> : ""}
				</div>
				<div className="form-button-container">
					<div data-testid="submit-button" onClick={submitForm} className="form-submit">Submit</div>
				</div>
			</div>

		</div>
	);
};


export default Signup;
