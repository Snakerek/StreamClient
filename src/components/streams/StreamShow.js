import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
export class StreamShow extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	render() {
		if (!this.props.currentStream) {
			return <div>Loading...</div>;
		}

		const { title, description } = this.props.currentStream;
		return (
			<div>
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	currentStream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = {
	fetchStream
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);
