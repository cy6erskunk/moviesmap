import PropTypes from 'prop-types'
import React, {Component} from 'react'

import store from '../store'
import {switchMovie, resetMovie} from '../actions'
import updateMarkers from '../tools/updateMarkers'

// @ts-expect-error ts-migrate(6142) FIXME: Module './Selector' was resolved to '/Users/igor/D... Remove this comment to see the full error message
import MovieSelector from './Selector'
// @ts-expect-error ts-migrate(6142) FIXME: Module './MoviesMap' was resolved to '/Users/igor/... Remove this comment to see the full error message
import MoviesMap from './MoviesMap'
// @ts-expect-error ts-migrate(6142) FIXME: Module './ErrorBubble' was resolved to '/Users/igo... Remove this comment to see the full error message
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

  constructor(props: any) {
    super(props)
    props.init()
  }

  componentDidMount = () => window.addEventListener('popstate', this.popStateHandler)

  componentWillUnmount = () => window.removeEventListener('popstate', this.popStateHandler)

  popStateHandler = (event: any) => this.dispatchChange(event.state ? event.state.title : '', true)

  dispatchChange(title: any, loadingHistory: any) {
    store.dispatch(title ? switchMovie(title, loadingHistory) : resetMovie(loadingHistory))
  }

  render() {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <React.StrictMode>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ErrorBubble message={this.props.error} />
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MovieSelector
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'titles' does not exist on type 'Readonly... Remove this comment to see the full error message
          titles={this.props.titles}
          className="title-select"
          handleChange={this.dispatchChange}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'movieTitle' does not exist on type 'Read... Remove this comment to see the full error message
          value={this.props.movieTitle}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingData' does not exist on type 'Rea... Remove this comment to see the full error message
          loadingData={this.props.loadingData}
        />
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MoviesMap
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'locations' does not exist on type 'Reado... Remove this comment to see the full error message
          locations={this.props.locations}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'movieTitle' does not exist on type 'Read... Remove this comment to see the full error message
          movieTitle={this.props.movieTitle}
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingLocations' does not exist on type... Remove this comment to see the full error message
          loadingLocations={this.props.loadingLocations}
          updateMarkers={updateMarkers}
        />
      </React.StrictMode>
    )
  }
}

export default SomeApp
