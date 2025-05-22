import constants from '../constants';
import fetchLocations from '../fetch/locations';
import fetchMovies from '../fetch/movies';

export const switchMovie = (title: string, loadingHistory?: boolean) => ({
  type: constants.SWITCH_MOVIE,
  title,
  loadingHistory
});

export const resetMovie = (loadingHistory?: boolean) => ({
  type: constants.RESET_MOVIE,
  loadingHistory
});

export const fetchMoviesData = () => (dispatch: any) => {
  dispatch({ type: constants.REQUEST_MOVIES_DATA });
  fetchMovies().then(
    (data) => dispatch({ type: constants.RECEIVE_MOVIES_DATA, data }),
    (error) => dispatch({ type: constants.RECEIVE_MOVIES_DATA, error })
  );
};

export const fetchLocationsData = () => (dispatch: any) => {
  dispatch({ type: constants.REQUEST_LOCATIONS_DATA });
  fetchLocations().then(
    (data) => dispatch({ type: constants.RECEIVE_LOCATIONS_DATA, data }),
    (error) => dispatch({ type: constants.RECEIVE_LOCATIONS_DATA, error })
  );
};

export const init = () => (dispatch: any) => {
  Promise.all([
    dispatch(fetchLocationsData()),
    dispatch(fetchMoviesData())
  ]).then(() => {
    dispatch(resetMovie());
  });
};
