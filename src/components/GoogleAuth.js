import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '151000439706-1dep5vp147tk6i0i20smd991ejv95gv4.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
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

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};
	render() {
		return <div className="item">{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => ({
	isSignedIn: state.auth.isSignedIn
});

const mapDispatchToProps = {
	signIn,
	signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
