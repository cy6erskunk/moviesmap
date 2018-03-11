import PropTypes from 'prop-types'
import React, {Component} from 'react'

import store from '../store'
import {switchMovie, resetMovie} from '../actions'

import MovieSelector from './Selector'
import MoviesMap from './MoviesMap'
import ErrorBubble from './ErrorBubble'

class SomeApp extends Component {
  dispatchChange(title) {
    store.dispatch(title ? switchMovie(title) : resetMovie())
  }

  render() {
    return (
      <React.Fragment>
        <ErrorBubble message={this.props.error} />
        <MovieSelector
          titles={this.props.titles}
          className="title-select"
          handleChange={this.dispatchChange}
          value={this.props.movieTitle}
          loadingData={this.props.loadingData}
        />
        <MoviesMap
          locations={this.props.locations}
          movieTitle={this.props.movieTitle}
          loadingLocations={this.props.loadingLocations}
        />
      </React.Fragment>
    )
  }
}

SomeApp.propTypes = {
  locations: PropTypes.object,
  movieTitle: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.string),
  loadingData: PropTypes.bool,
  error: PropTypes.string,
  loadingLocations: PropTypes.bool,
}

export default SomeApp
