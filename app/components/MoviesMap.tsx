/* ts-global google */
import { Component, Fragment } from 'react';

import constants from '../constants';

function noop() {
  return undefined;
}

const mapStyle = {
  width: '98vw',
  height: 'calc(100vh - 4em)',
  margin: 0,
  padding: 0
};

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  /* { location name => coordinates } */
  locations: Record<string, any>;
  movieTitle?: string;
  position: Position;
  loadingLocations: boolean;
  updateMarkers: (
    google: any,
    { markers, locations, movieTitle, map, infoWindow }: any
  ) => void;
};
class MoviesMap extends Component<Props> {
  static defaultProps = {
    /* initial center of the map */
    position: {
      lat: 37.790704,
      lng: -122.418769
    },
    locations: {},
    loadingLocations: true,
    updateMarkers: noop
  };

  infoWindow: any;
  map: any;
  mapElem: any;
  mapInited: any;
  markers: any;

  constructor(props: any) {
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
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'map' does not exist on type 'Window & ty... Remove this comment to see the full error message
      window.map = this.map;
      this.mapInited = true;
    }
  }

  componentDidUpdate() {
    if (this.mapInited) {
      this.markers = this.props.updateMarkers(google, {
        locations: this.props.locations,
        markers: this.markers,
        infoWindow: this.infoWindow,
        map: this.map,
        movieTitle: this.props.movieTitle
      });

      const locationTitles = Object.keys(this.props.locations);
      const bounds = new google.maps.LatLngBounds();

      if (this.markers.length) {
        this.markers.forEach((marker: any) => {
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

  refDiv(div: any) {
    this.mapElem = div;
  }

  render() {
    const LOADING_MESSAGE = 'loadingLocations';
    return (
      <Fragment>
        {this.props.loadingLocations && <div>{LOADING_MESSAGE}</div>}
        <div ref={this.refDiv} style={mapStyle} className="mapContainer" />
      </Fragment>
    );
  }
}

export default MoviesMap;
