/* eslint-env es6 */
'use strict';
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
    locations: React.PropTypes.object,
    movieTitle: React.PropTypes.string,
    titles: React.PropTypes.arrayOf(React.PropTypes.string),
    loadingData: React.PropTypes.bool,
    error: React.PropTypes.string,
    loadingLocations: React.PropTypes.bool
};

export default SomeApp;