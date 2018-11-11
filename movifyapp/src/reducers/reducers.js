const INITIAL_STATE = {
    user: undefined,
    movieSearchData: [],
    profileSearchData: [],
    searchSpinner: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'user_changed':
            return { ...state, user: action.payload };
        case 'movieSearchData_changed':
            return { ...state, movieSearchData: action.payload };
        case 'profileSearchData_changed':
            return { ...state, profileSearchData: action.payload };
        case 'searchSpinner_changed':
            return { ...state, searchSpinner: action.payload };
        default:
            return state;
    }
};
