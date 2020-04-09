import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors/selectors';
import { isEmpty } from '../../utils/utils';

// Styles
import './LoggedInBanner.css'


const LoggedInBanner = () => {

	const userLoggedIn = useSelector(getCurrentUser);

	return (isEmpty(userLoggedIn)) ? '' : (
		<div data-testid="logged-in-banner" className="logged-in-banner"></div>
	)
}


export default LoggedInBanner;
