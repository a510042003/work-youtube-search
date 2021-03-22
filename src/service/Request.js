import axios from 'axios';

const key = 'YOUR_API_KEY';
const limit = 24;
export const getYoutubeList = (searchText, pageToken) => {
	return axios.get('https://youtube.googleapis.com/youtube/v3/search', {
		params: {
			key,
			part: 'snippet',
			type: 'video',
			maxResults: limit,
			pageToken,
			q: searchText
		}
	});
};
