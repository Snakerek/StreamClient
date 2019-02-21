import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import { editStream } from '../../actions';
import StreamForm from './StreamForm';
export class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		//console.log(formValues);

		this.props.editStream(this.props.match.params.id, formValues);
	};
	render() {
		if (!this.props.currentStream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3>Edycja</h3>
				<StreamForm
					initialValues={_.pick(this.props.currentStream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	currentStream: state.streams[ownProps.match.params.id]
});

const mapDispatchToProps = {
	fetchStream,
	editStream
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
