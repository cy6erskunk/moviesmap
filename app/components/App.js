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

class SomeAppContainer extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.setState({
                locations: store.getState().locations,
                titles: store.getState().titles,
                error: store.getState().error
            })
        );

        // store.dispatch(init());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <SomeApp
                locations={ store.getState().locations }
                titles={ store.getState().titles }
                movieTitle={ store.getState().title }
                loadingData={ store.getState().loadingData }
                error={ store.getState().error }
                loadingLocations={ store.getState().loadingLocations }
            />
        );
    }
}

export default SomeAppContainer;