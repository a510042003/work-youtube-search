import { getYoutubeList } from './service/Request';

const getModel = (item) => {
	return { id: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.high.url };
};
export const changeText = (text) => ({
	type: 'CHANGE_SEARCH_TEXT',
	text: text
});

export const getList = () => async (dispatch) => {
	const { data } = await getYoutubeList();
	console.log(data);
	dispatch({
		type: 'SET_RESULT',
		result: data.items.map((el) => getModel(el))
	});
};
