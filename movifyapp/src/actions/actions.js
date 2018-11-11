export const userChanged = (user) => (dispatch) => {
        dispatch({
            type: 'user_changed',
            payload: user,
        });
    };
    
export const movieSearchDataChanged = (movieSearchData) => (dispatch) => {
    dispatch({
        type: 'movieSearchData_changed',
        payload: movieSearchData,
    });
};

export const profileSearchDataChanged = (profileSearchData) => (dispatch) => {
    dispatch({
        type: 'profileSearchData_changed',
        payload: profileSearchData,
    });
};

export const searchSpinnerChanged = (searchSpinner) => (dispatch) => {
    dispatch({
        type: 'searchSpinner_changed',
        payload: searchSpinner,
    });
};