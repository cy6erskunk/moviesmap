/* global google */
import React, {Component} from 'react';
import constants from './constants';

const mapStyle = {
    width: '98vw',
    height: 'calc(100vh - 4em)',
    margin: 0,
    padding: 0
};

class MoviesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        let mapOptions = {
            zoom: 10,
            center: this.props.position
        };
        let locations = this.props.locations;

        let map = new google.maps.Map(this.refs.map, mapOptions);
        window.map = map;

        let markers = Object.keys(locations).map(locationKey => {
            return new google.maps.Marker({
                position: locations[locationKey],
                map: map,
                title: locationKey,
                something: this.props.movieTitle
            });
        });
        this.setState({markers});

        let infoWindow = new google.maps.InfoWindow();

        markers.forEach(marker => {
            google.maps.event.addListener(marker, 'click', () => {
                infoWindow.setContent(`<h2>${marker.title}</h2><p>${this.props.movieTitle}</p>`);
                infoWindow.open(map, marker);
            });
        });
    }

    componentDidUpdate() {
        let locationTitles = Object.keys(this.props.locations);
        let bounds = new google.maps.LatLngBounds();

        this.state.markers.forEach(marker => {
            marker.setVisible(locationTitles.includes(marker.getTitle()));
            if (locationTitles.includes(marker.getTitle())) {
                bounds.extend(marker.getPosition());
            }
        });
        /* global map */
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
            map.setCenter(bounds.getCenter());
            if (map.getZoom() > constants.MAX_ZOOM_AFTER_BOUND_CHANGE) {
                map.setZoom(constants.MAX_ZOOM_AFTER_BOUND_CHANGE);
            }
        });
    }

    render() {
        return <div ref="map" style={mapStyle} className="mapContainer"></div>;
    }
    
}

MoviesMap.defaultProps = {
    position: {
        lat: 37.790704,
        lng: -122.418769
    }
};

MoviesMap.propTypes = {
    locations: React.PropTypes.object,
    movieTitle: React.PropTypes.string,
    position: React.PropTypes.object
};

export default MoviesMap;