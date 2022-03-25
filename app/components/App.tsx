import React, {Component} from 'react'

import store from '../store'
import {switchMovie, resetMovie} from '../actions'
import updateMarkers from '../tools/updateMarkers'

import MovieSelector from './Selector'
import MoviesMap from './MoviesMap'
import ErrorBubble from './ErrorBubble'

type Props = {
  locations: Record<string, any>
  movieTitle?: string
  titles: string[]
  loadingData?: boolean
  error?: string
  loadingLocations?: boolean
  init: () => void
}

class SomeApp extends Component<Props> {
  constructor(props: Props) {
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
