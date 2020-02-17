import React, { useEffect } from 'react';

// Styles
import './Position.css';

const Position = (props) => {
	const { id, mergeBoard, onClick } = props;
	let { status, text } = mergeBoard(id)

	return (
		<div className={`position${status}`}
			 key={id} 
			 onClick={()=> onClick(id)}>
			 <div>{text}</div>
		</div>
	);
};


export default Position;
