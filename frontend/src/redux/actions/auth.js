import axios from 'axios';

export const SET_ERRORS = 'SET_ERRORS';
export const SET_LOADING = 'SET_LOADING';


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
