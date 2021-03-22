import { getYoutubeList } from './service/Request';

const getModel = (item) => {
	return { id: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.high.url };
};
export const changeText = (text) => ({
	type: 'CHANGE_SEARCH_TEXT',
	text: text
});

export const getList = (isReset) => async (dispatch, getState) => {
	const { searchText, searchResult, pageInfo } = getState();
	const array = [];
	if (!isReset) {
		array.push(...searchResult);
	}
	try {
		dispatch({
			type: 'TOGGLE_LOADING'
		});
		const { data } = await getYoutubeList(searchText, isReset ? null : pageInfo.anchor);

		array.push(...data.items.map((el) => getModel(el)));
		dispatch({
			type: 'SET_RESULT',
			result: array
		});
		const newPage = {
			...pageInfo,
			totalPage: isReset ? 1 : pageInfo.currentPage,
			currentPage: isReset ? 1 : pageInfo.currentPage,
			anchor: data.nextPageToken
		};
		dispatch({
			type: 'SET_PAGEINFO',
			pageInfo: newPage
		});
		dispatch({
			type: 'TOGGLE_LOADING'
		});
	} catch (err) {
		dispatch({
			type: 'TOGGLE_LOADING'
		});
	}
};

export const changeResultPage = (page) => async (dispatch, getState) => {
	const { pageInfo } = getState();
	dispatch({
		type: 'SET_PAGEINFO',
		pageInfo: {
			...pageInfo,
			currentPage: page
		}
	});
	if (page > pageInfo.totalPage) {
		dispatch(getList());
	}
};
