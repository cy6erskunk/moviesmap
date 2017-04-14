import constants from '../constants';
import fetchAPIData from '../fetchAPI';

export const init = (data) => {
    return {
        type: constants.INIT_DATA,
        data: data
    };
};

export const switchMovie = title => {
    return { 
        type: constants.SWITCH_MOVIE, 
        title
    };
};

export const resetMovie = () => {
    return { type: constants.RESET_MOVIE };
};

export const fetchData = () => {
    return (dispatch) => {
        dispatch({type: constants.REQUEST_DATA});
        fetchAPIData().then(
            (data) => dispatch({type: constants.RECEIVE_DATA, data}),
            (error) => dispatch({type: constants.RECEIVE_DATA, error})
        );
    };
};