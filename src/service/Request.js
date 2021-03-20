import axios from 'axios';

const key = 'AIzaSyD4FlrD7730Qinq88GpKCQFxZvh3tUFm2s';

export const getYoutubeList = () => {
	return axios.get('https://youtube.googleapis.com/youtube/v3/search', {
		params: {
			key,
			part: 'snippet'
		}
	});
};
