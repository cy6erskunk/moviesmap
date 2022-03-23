import constants from '../constants'
import fetchMovies from '../fetch/movies'
import fetchLocations from '../fetch/locations'

export const switchMovie = (title, loadingHistory) => ({
  type: constants.SWITCH_MOVIE,
  title,
  loadingHistory,
})

export const resetMovie = (loadingHistory) => ({type: constants.RESET_MOVIE, loadingHistory})

export const fetchMoviesData = () => (dispatch) => {
  dispatch({type: constants.REQUEST_MOVIES_DATA})
  fetchMovies().then(
    (data) => dispatch({type: constants.RECEIVE_MOVIES_DATA, data}),
    (error) => dispatch({type: constants.RECEIVE_MOVIES_DATA, error}),
  )
}

export const fetchLocationsData = () => (dispatch) => {
  dispatch({type: constants.REQUEST_LOCATIONS_DATA})
  fetchLocations().then(
    (data) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, data}),
    (error) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, error}),
  )
}

export const init = () => (dispatch) => {
  Promise.all([dispatch(fetchLocationsData()), dispatch(fetchMoviesData())]).then(() => {
    dispatch(resetMovie())
  })
}
