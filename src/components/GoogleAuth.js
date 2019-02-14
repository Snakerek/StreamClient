import React, { Component } from 'react';

export default class GoogleAuth extends Component {
	state = { isSignedIn: null };
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '151000439706-1dep5vp147tk6i0i20smd991ejv95gv4.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.wylogujClick}>
					<i className="google icon" />
					Wyloguj
				</button>
			);
		} else {
			return (
				<button className="ui green google button" onClick={this.zalogujClick}>
					<i className="google icon" />
					Zaloguj przez Google
				</button>
			);
		}
	}

	wylogujClick = () => {
		this.auth.signOut();
	};

	zalogujClick = () => {
		this.auth.signIn();
	};
	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};
	render() {
		return <div className="item">{this.renderAuthButton()}</div>;
	}
}
