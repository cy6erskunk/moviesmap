import PropTypes from 'prop-types'
import React, {Component} from 'react'

import store from '../store'
import {switchMovie, resetMovie} from '../actions'
import updateMarkers from '../tools/updateMarkers'

import MovieSelector from './Selector'
import MoviesMap from './MoviesMap'
import ErrorBubble from './ErrorBubble'

class SomeApp extends Component {
  static propTypes = {
    locations: PropTypes.object,
    movieTitle: PropTypes.string,
    titles: PropTypes.arrayOf(PropTypes.string),
    loadingData: PropTypes.bool,
    error: PropTypes.string,
    loadingLocations: PropTypes.bool,
    init: PropTypes.func,
  }

  constructor(props) {
    super(props)
    props.init()
  }

  componentDidMount = () => window.addEventListener('popstate', this.popStateHandler)

  componentWillUnmount = () => window.removeEventListener('popstate', this.popStateHandler)

  popStateHandler = event => this.dispatchChange(event.state ? event.state.title : '', true)

  dispatchChange(title, loadingHistory) {
    store.dispatch(title ? switchMovie(title, loadingHistory) : resetMovie(loadingHistory))
  }

  render() {
    return (
      <React.StrictMode>
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
          updateMarkers={updateMarkers}
        />
      </React.StrictMode>
    )
  }
}

export default SomeApp
