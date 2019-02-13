import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Page1 = () => {
	return (
		<div>
			<p>Page 1 </p>
			<Link to="/2">Strona 2</Link>
		</div>
	);
};

const Page2 = () => {
	return (
		<div>
			<p>Page 2 </p>
			<Link to="/">Strona 1</Link>
			<br />
			<Link to="/2/3">Strona 3</Link>
		</div>
	);
};

const Page3 = () => {
	return (
		<div>
			<p>Page 3 </p>
			<Link to="/">Strona 1</Link>
			<br />
			<Link to="/2">Strona 2</Link>
		</div>
	);
};

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Route path="/" exact component={Page1} />
					<Route path="/2" exact component={Page2} />
					<Route path="/2/3" exact component={Page3} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
