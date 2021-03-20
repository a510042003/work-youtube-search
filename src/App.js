import React, { Component } from 'react';
import './App.css';
import { getYoutubeList } from './service/Request';
import { connect } from 'react-redux';
import { increment } from './actions';

class App extends Component {
	async componentDidMount() {
		const { data } = await getYoutubeList();
		console.log(data);
	}
	render() {
		return (
			<div className="App">
				<button onClick={this.props.increment}>click</button>
				{this.props.number}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	number: state
});

const mapDispatchToProps = (dispatch) => ({
	increment: () => dispatch(increment())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
