// App Dependencies
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validate from '../../validators/auth';
import { loginUser, setErrors } from '../../redux/actions/auth';
import { getErrors } from '../../redux/selectors/selectors'

// Styles
import './Login.css';


const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const errors = useSelector(getErrors)

	const updateUsername = (evt) => {
		setUsername(evt.target.value)
	}

	const updatePassword = (evt) => {
		setPassword(evt.target.value)
	}

	const submitForm = (e) => {
		e.preventDefault();

		dispatch(setErrors({}));	
		const userAttrs = {username, password};
		const {errors, result, isValid } = validate.login(userAttrs);
		if (!isValid) {
			dispatch(setErrors(errors));
		}
		else {
			dispatch(loginUser(result))
		}
	}

	return (
		<div data-testid="login-container" className="login-container">
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


export default Login;
