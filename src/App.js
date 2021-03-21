import React, { useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { changeText, getList } from './actions';
import { Input, Card } from 'antd';
const { Meta } = Card;
const { Search } = Input;
const App = ({ searchText, changeText, searchResult, openVideo }) => {
	useEffect(() => {
		getList();
	}, []);

	return (
		<div className="App">
			<Search
				placeholder="input search text"
				onSearch={() => {}}
				enterButton
				value={searchText}
				onChange={(e) => {
					changeText(e.target.value);
				}}
			/>
			<div style={{ display: 'flex', flexWrap: 'wrap', padding: 20, width: '100%' }}>
				{searchResult.map((el) => (
					<Card
						key={el.id}
						hoverable
						style={{ width: 300 }}
						cover={
							<img
								alt="avatar"
								src={el.thumbnail}
								onClick={() => {
									openVideo(el.id);
								}}
							/>
						}
					>
						<Meta title={el.title} />
					</Card>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	searchText: state.searchText,
	searchResult: state.searchResult
});

const mapDispatchToProps = (dispatch) => ({
	changeText: (text) => dispatch(changeText(text)),
	getList: dispatch(getList()),
	openVideo: (id) => {
		window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
