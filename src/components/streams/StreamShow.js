import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';
export class StreamShow extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		this.props.fetchStream(id);
		this.buildPlayer();
	}
	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer() {
		const { id } = this.props.match.params;
		if (this.player || !this.props.currentStream) {
			return;
		} else {
			this.player = flv.createPlayer({
				type: 'flv',
				url: `http://localhost:8000/live/${id}.flv`
			});
			this.player.attachMediaElement(this.videoRef.current);
			this.player.load();
			this.player.play();
		}
	}
	render() {
		if (!this.props.currentStream) {
			return <div>Loading...</div>;
		}

		const { title, description } = this.props.currentStream;
		return (
			<div>
				<video ref={this.videoRef} style={{ width: '100%' }} controls />
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
