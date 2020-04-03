// App Dependencies
import React from 'react';

// Styles
import './Position.css';


const Position = (props) => {
	const { id, mergeBoard, onClick } = props;
	let { status, text } = mergeBoard(id);

	return (
		<div data-testid="position" className={`position${status}`}
			 key={id} 
			 onClick={()=> onClick(id)}>
			 <div data-testid="position-text">{text}</div>
		</div>
	);
};


export default Position;
