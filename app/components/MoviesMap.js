import PropTypes from 'prop-types';
/* global google */
import React, {Component} from 'react';

import constants from '../constants';

const mapStyle = {
  width: '98vw',
  height: 'calc(100vh - 4em)',
  margin: 0,
  padding: 0
};

class MoviesMap extends Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.mapInited = false;

    this.refDiv = this.refDiv.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      zoom: 10,
      center: this.props.position
    };

    if (typeof google !== 'undefined') {
      this.map = new google.maps.Map(this.mapElem, mapOptions);
      this.infoWindow = new google.maps.InfoWindow();
      window.map = this.map;
      this.mapInited = true;
    }
  }

  componentDidUpdate() {
    if (this.mapInited) {
      this.updateMarkers();

      const locationTitles = Object.keys(this.props.locations);
      const bounds = new google.maps.LatLngBounds();

      if (this.markers.length) {
        this.markers.forEach(marker => {
          marker.setVisible(locationTitles.includes(marker.getTitle()));
          if (locationTitles.includes(marker.getTitle())) {
            bounds.extend(marker.getPosition());
          }
        });

        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
          this.map.setCenter(bounds.getCenter());
          if (this.map.getZoom() > constants.MAX_ZOOM_AFTER_BOUND_CHANGE) {
            this.map.setZoom(constants.MAX_ZOOM_AFTER_BOUND_CHANGE);
          }
        });
      }
    }
  }

  updateMarkers() {
    this.markers.forEach((m, i, array) => {
      m.setMap(null);
      array[i] = null;
    });
    this.markers = [];
    const locations = this.props.locations;
    const markers = Object.keys(locations).
      map(locationKey => new google.maps.Marker({
        position: locations[locationKey],
        map: this.map,
        title: locationKey,
        something: this.props.movieTitle
      }));

    markers.forEach(marker => {
      google.maps.event.addListener(marker, 'click', () => {
        this.infoWindow.setContent(`<h2>${marker.title}</h2><p>${this.props.movieTitle}</p>`);
        this.infoWindow.open(this.map, marker);
      });
    });
    this.markers = markers;
  }

  refDiv(div) {
    this.mapElem = div;
  }

  render() {
    const LOADING_MESSAGE = 'loadingLocations';
    return (<div>
      {this.props.loadingLocations && <div>{LOADING_MESSAGE}</div>}
      <div
        ref={this.refDiv}
        style={mapStyle}
        className="mapContainer"
      />
    </div>);
  }

}

MoviesMap.defaultProps = {
  /* initial center of the map */
  position: {
    lat: 37.790704,
    lng: -122.418769
  },
  locations: {},
  loadingLocations: true
};

MoviesMap.propTypes = {
  /* { location name => coordinates } */
  locations: PropTypes.object,
  movieTitle: PropTypes.string,
  position: PropTypes.object,
  loadingLocations: PropTypes.bool
};

export default MoviesMap;
