const initialState = {
	searchText: '',
	searchResult: [],
	currentPage: 1,
	totalPage: 1
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return { ...state, searchText: action.text };
		case 'SET_RESULT':
			return { ...state, searchResult: action.result };

		default:
			return state;
	}
};

export default Reducer;
