import constants from '../constants'
import fetchMovies from '../fetch/movies'
import fetchLocations from '../fetch/locations'

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
export const switchMovie = (title, loadingHistory) => ({
  type: constants.SWITCH_MOVIE,
  title,
  loadingHistory,
})

export const resetMovie = (loadingHistory: any) => ({
  type: constants.RESET_MOVIE,
  loadingHistory,
})

export const fetchMoviesData = () => (dispatch: any) => {
  dispatch({type: constants.REQUEST_MOVIES_DATA})
  fetchMovies().then(
    (data) => dispatch({type: constants.RECEIVE_MOVIES_DATA, data}),
    (error) => dispatch({type: constants.RECEIVE_MOVIES_DATA, error}),
  )
}

export const fetchLocationsData = () => (dispatch: any) => {
  dispatch({type: constants.REQUEST_LOCATIONS_DATA})
  fetchLocations().then(
    (data) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, data}),
    (error) => dispatch({type: constants.RECEIVE_LOCATIONS_DATA, error}),
  )
}

export const init = () => (dispatch: any) => {
  Promise.all([dispatch(fetchLocationsData()), dispatch(fetchMoviesData())]).then(() => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    dispatch(resetMovie())
  })
}
