const initialState = {
	searchText: '',
	searchResult: [],
	pageInfo: {
		currentPage: 1,
		anchor: null,
		totalPage: 1
	},
	loading: false
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return { ...state, searchText: action.text };
		case 'SET_RESULT':
			return { ...state, searchResult: action.result };
		case 'SET_PAGEINFO':
			return { ...state, pageInfo: action.pageInfo };
		case 'TOGGLE_LOADING':
			return { ...state, loading: !state.loading };
		default:
			return state;
	}
};

export default Reducer;
