import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBar() {
	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="item">
				Streamy
			</Link>
			<Link to="/streams/new" className="item">
				New
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					All Streams
				</Link>
			</div>
		</div>
	);
}
