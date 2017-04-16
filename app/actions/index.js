import constants from '../constants';
import fetchMovies from '../fetch/movies';
import fetchLocations from '../fetch/locations';
 
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

export const fetchMoviesData = () => {
    return (dispatch) => {
        dispatch({type: constants.REQUEST_MOVIES_DATA});
        fetchMovies().then(
            (data) => dispatch({type: constants.RECEIVE_MOVIES_DATA, data}),
            (error) => dispatch({type: constants.RECEIVE_MOVIES_DATA, error})
        );
    };
};

export const fetchLocationsData = () => {
    return (dispatch) => {
        dispatch({type: constants.REQUEST_MOVIES_DATA});
        fetchLocations().then(
            (data) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, data}),
            (error) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, error})
        );
    };
};