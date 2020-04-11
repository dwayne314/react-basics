import React from 'react';
import  { useSelector } from 'react-redux';

import { getFlashMessage } from '../../redux/selectors/selectors';
import './FlashMessage.css';


const FlashMessage = () => {

	const colorMapper = [
		{
			severity: 1,
			color: '#80d250'
		},
		{
			severity: 3,
			color: '#ff8a8a'
		}]

	const { message='', severity='' } = useSelector(getFlashMessage);
	const flashColor = colorMapper.find(mapper => mapper.severity === severity).color;

	return ((message) ? 
				<div data-testid="flash-message" className="flash-message" style={{backgroundColor: flashColor}}>{ message }</div> :
				null)
};

export default FlashMessage;
