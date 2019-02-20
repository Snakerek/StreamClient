import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
export class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	render() {
		console.log(this.props);
		if (!this.props.currentStream) {
			return <div>Loading...</div>;
		}
		return <div>{this.props.currentStream.title}</div>;
	}
}

const mapStateToProps = (state, ownProps) => ({
	currentStream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = {
	fetchStream
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
