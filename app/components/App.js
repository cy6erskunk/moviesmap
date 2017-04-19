/* eslint-env es6 */
'use strict';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import store from '../store';
import { switchMovie, resetMovie }  from '../actions';
import MovieSelector from './Selector';
import MoviesMap from './MoviesMap';
import ErrorBubble from './ErrorBubble';

class SomeApp extends Component {
    dispatchChange(title) {
        title ?
            store.dispatch(switchMovie(title)) :
            store.dispatch(resetMovie());
    }
    
    render() {
        return (<div>
            <ErrorBubble message={this.props.error}/>
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
        </div>);
    }

}

SomeApp.propTypes = {
    locations: PropTypes.object,
    movieTitle: PropTypes.string,
    titles: PropTypes.arrayOf(PropTypes.string),
    loadingData: PropTypes.bool,
    error: PropTypes.string,
    loadingLocations: PropTypes.bool
};

export default SomeApp;