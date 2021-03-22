import React, { useEffect } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { changeText, getList, changeResultPage } from './actions';
import { Input, Card, Button } from 'antd';
const { Meta } = Card;
const { Search } = Input;
const App = ({ searchText, changeText, searchResult, openVideo, getResult, changePage, currentPage, pager }) => {
	return (
		<div className="App">
			<Search
				placeholder="請輸入開始搜尋"
				onSearch={getResult}
				className="input"
				enterButton
				value={searchText}
				onChange={(e) => {
					changeText(e.target.value);
				}}
			/>
			<div className="result-container">
				{searchResult.map((el) => (
					<Card
						key={el.id}
						hoverable
						className="card"
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
			<div className="footer">
				<div className="footer-item">
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
		</div>
	);
};

const mapStateToProps = (state) => {
	const { totalPage, currentPage, anchor } = state.pageInfo;
	const pager = Array.from(Array(totalPage + 1).keys());
	pager.shift();

	const searchResult = state.searchResult.slice((currentPage - 1) * 24, currentPage * 24);
	if (searchResult.length === 0) {
		pager.shift();
	}
	if (!!anchor) {
		pager.push(totalPage + 1);
	}
	return {
		searchText: state.searchText,
		searchResult,
		currentPage,
		pager: state.loading ? [] : pager
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
