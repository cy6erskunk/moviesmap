import PropTypes from 'prop-types'
/* global google */
import React, {Component} from 'react'

import constants from '../constants'

function noop() {}

const mapStyle = {
  width: '98vw',
  height: 'calc(100vh - 4em)',
  margin: 0,
  padding: 0,
}

class MoviesMap extends Component {
  static propTypes = {
    /* { location name => coordinates } */
    locations: PropTypes.object,
    movieTitle: PropTypes.string,
    position: PropTypes.object,
    loadingLocations: PropTypes.bool,
    updateMarkers: PropTypes.func,
  }

  static defaultProps = {
    /* initial center of the map */
    position: {
      lat: 37.790704,
      lng: -122.418769,
    },
    locations: {},
    loadingLocations: true,
    updateMarkers: noop,
  }

  constructor(props) {
    super(props)

    this.markers = []
    this.mapInited = false

    this.refDiv = this.refDiv.bind(this)
  }

  componentDidMount() {
    const mapOptions = {
      zoom: 10,
      center: this.props.position,
    }

    if (typeof google !== 'undefined') {
      this.map = new google.maps.Map(this.mapElem, mapOptions)
      this.infoWindow = new google.maps.InfoWindow()
      window.map = this.map
      this.mapInited = true
    }
  }

  componentDidUpdate() {
    if (this.mapInited) {
      this.markers = this.props.updateMarkers(google, {
        locations: this.props.locations,
        markers: this.markers,
        infoWindow: this.infoWindow,
        map: this.map,
        movieTitle: this.props.movieTitle,
      })

      const locationTitles = Object.keys(this.props.locations)
      const bounds = new google.maps.LatLngBounds()

      if (this.markers.length) {
        this.markers.forEach((marker) => {
          marker.setVisible(locationTitles.includes(marker.getTitle()))
          if (locationTitles.includes(marker.getTitle())) {
            bounds.extend(marker.getPosition())
          }
        })

        this.map.setCenter(bounds.getCenter())
        this.map.fitBounds(bounds)
        google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
          this.map.setCenter(bounds.getCenter())
          if (this.map.getZoom() > constants.MAX_ZOOM_AFTER_BOUND_CHANGE) {
            this.map.setZoom(constants.MAX_ZOOM_AFTER_BOUND_CHANGE)
          }
        })
      }
    }
  }

  refDiv(div) {
    this.mapElem = div
  }

  render() {
    const LOADING_MESSAGE = 'loadingLocations'
    return (
      <React.Fragment>
        {this.props.loadingLocations && <div>{LOADING_MESSAGE}</div>}
        <div ref={this.refDiv} style={mapStyle} className="mapContainer" />
      </React.Fragment>
    )
  }
}

export default MoviesMap
