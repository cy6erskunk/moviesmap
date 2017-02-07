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

        this.state.markers = Object.keys(locations).map((locationKey, i) => {
            return new google.maps.Marker({
                position: locations[locationKey],
                map: map,
                title: locationKey
            });
        });
        // window.markers = markers;

        // // Add a marker clusterer to manage the markers.
        // var markerCluster = new MarkerClusterer(map, markers,
        //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }

    componentDidUpdate() {
        let locationTitles = Object.keys(this.props.locations);
        this.state.markers.forEach(marker => {
            marker.setVisible(locationTitles.includes(marker.getTitle()));
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