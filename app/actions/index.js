import constants from '../constants';
import fetchMovies from '../fetch/movies';
import fetchLocations from '../fetch/locations';

export const init = data => ({
  type: constants.INIT_DATA,
  data
});

export const switchMovie = title => ({
  type: constants.SWITCH_MOVIE,
  title
});

export const resetMovie = () => ({type: constants.RESET_MOVIE});

export const fetchMoviesData = () => dispatch => {
  dispatch({type: constants.REQUEST_MOVIES_DATA});
  fetchMovies().then(
    data => dispatch({type: constants.RECEIVE_MOVIES_DATA, data}),
    error => dispatch({type: constants.RECEIVE_MOVIES_DATA, error})
  );
};

export const fetchLocationsData = () => dispatch => {
  dispatch({type: constants.REQUEST_MOVIES_DATA});
  fetchLocations().then(
    data => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, data}),
    error => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, error})
  );
};
