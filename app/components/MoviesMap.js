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
    }

    updateMarkers() {
        this.markers.forEach(m => {
            m.setMap(null);
            m = null;
        });
        this.markers = [];
        let locations = this.props.locations;
        let markers = Object.keys(locations).map(locationKey => {
            return new google.maps.Marker({
                position: locations[locationKey],
                map: this.map,
                title: locationKey,
                something: this.props.movieTitle
            });
        });

        markers.forEach(marker => {
            google.maps.event.addListener(marker, 'click', () => {
                this.infoWindow.setContent(`<h2>${marker.title}</h2><p>${this.props.movieTitle}</p>`);
                this.infoWindow.open(this.map, marker);
            });
        });
        this.markers = markers;
    }

    componentDidMount() {
        let mapOptions = {
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

            let locationTitles = Object.keys(this.props.locations);
            let bounds = new google.maps.LatLngBounds();

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

    refDiv(div) {
        this.mapElem = div;
    }

    render() {
        return <div>
            {this.props.loadingLocations && <div>loadingLocations</div>}
            <div 
                ref={this.refDiv.bind(this)} 
                style={mapStyle} 
                className="mapContainer"
            ></div>
        </div>;
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
    locations: React.PropTypes.object,
    movieTitle: React.PropTypes.string,
    position: React.PropTypes.object,
    loadingLocations: React.PropTypes.bool
};

export default MoviesMap;