import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	deleteCurrentStream = (id) => {
		this.props.deleteStream(id);
		history.push('/');
	};
	renderActions() {
		const { id } = this.props.match.params;
		return (
			<React.Fragment>
				<button onClick={() => this.deleteCurrentStream(id)} className="ui approve red button">
					Usuń
				</button>
				<Link to="/" className="ui cancel green button">
					Anuluj
				</Link>
			</React.Fragment>
		);
	}
	renderContent() {
		if (!this.props.currentStream) {
			return 'Czy na pewno chcesz usunąć ten stream?';
		}

		return `Czy na pewno chcesz usunąć stream o tytule: ${this.props.currentStream.title} ?`;
	}
	render() {
		return (
			<Modal
				title="Usuń"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	currentStream: state.streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
