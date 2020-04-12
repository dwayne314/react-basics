import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth';
import { clearBoard, resetScore } from '../../redux/actions/actions';

// Utility Dependencies
import { getCurrentUser } from '../../redux/selectors/selectors';
import { isEmpty } from '../../utils/utils';

const Logout = (props) => {

	const userLoggedIn = useSelector(getCurrentUser);
	const dispatch = useDispatch();

	const logout = useCallback(() => {

		if (!isEmpty(userLoggedIn)) {
			dispatch(logoutUser());
			dispatch(clearBoard());
			dispatch(resetScore());
		}
		props.history.push('/');


	}, [dispatch, props.history, userLoggedIn])

	useEffect(() => {
		logout();
	}, [logout])

	return null;
}


export default Logout;
