import React, { useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { changeText, getList, changeResultPage } from './actions';
import { Input, Card, Button } from 'antd';
const { Meta } = Card;
const { Search } = Input;
const App = ({
	searchText,
	changeText,
	searchResult,
	openVideo,
	getResult,
	totalPage,
	changePage,
	hasLastPage,
	currentPage
}) => {
	// useEffect(() => {

	// 	getResult(true);
	// }, []);

	const pager = Array.from(Array(totalPage + 1).keys());
	pager.shift();
	if (hasLastPage) {
		pager.push(totalPage + 1);
	}

	console.log(pager);

	return (
		<div className="App">
			<Search
				placeholder="input search text"
				onSearch={getResult}
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
						style={{ width: 100 }}
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
			<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
				{pager.map((el) => (
					<Button
						disabled={el === currentPage}
						key={`${el}`}
						style={{ marginTop: 8, marginRight: 4 }}
						onClick={() => {
							changePage(el);
						}}
					>
						{el}
					</Button>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const { totalPage, currentPage, anchor } = state.pageInfo;
	return {
		searchText: state.searchText,
		searchResult: state.searchResult.slice((currentPage - 1) * 24, currentPage * 24),
		totalPage,
		currentPage,
		hasLastPage: !!anchor
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeText: (text) => dispatch(changeText(text)),
	getResult: () => dispatch(getList(true)),
	openVideo: (id) => {
		window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
	},
	changePage: (page) => dispatch(changeResultPage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
