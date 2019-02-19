import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

export class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return <div>EDIT/DELETE</div>;
		}
	}
	renderList() {
		return this.props.streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					<i className="large middle aligned icon camera" />
					<div className="content">
						{stream.title}
						<div className="description">{stream.description}</div>
					</div>
					{this.renderAdmin(stream)}
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	streams: Object.values(state.streams),
	currentUserId: state.auth.userId
});

const mapDispatchToProps = {
	fetchStreams
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
