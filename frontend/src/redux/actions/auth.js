import axios from 'axios';

export const SET_ERRORS = 'SET_ERRORS';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER = 'SET_USER';


export const setLoading = (status) => {
	return {
		type: SET_LOADING,
		payload: Boolean(status)
	}
}

export const setErrors = (errors) => {
	return {
		type: SET_ERRORS,
		payload: errors
	}
}

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user
	}
}

export const registerUser = (userData) => dispatch => {
	
	dispatch(setLoading(true))
	return axios
        .post('/api/register', userData)
        .then((user) => {
	        dispatch(setLoading(false));
        })
        .catch((err) => {
	        dispatch(setErrors(err.response.data));
	        dispatch(setLoading(false));
        })

};

export const loginUser = (userData) => dispatch => {
	dispatch(setLoading(true));
	return axios
        .post('/api/login', userData)
        .then((user) => {
        	dispatch(setUser(user.data));
	        dispatch(setLoading(false));
        })
        .catch((err) => {
	        dispatch(setErrors(err.response.data));
	        dispatch(setLoading(false));
        })
};


export const logoutUser = () => dispatch => {
	return axios
		.post('/api/logout')
		.then(() => dispatch(setUser({})))
		.catch((err) => {
			dispatch(setErrors(err.response.data));
		})
};
