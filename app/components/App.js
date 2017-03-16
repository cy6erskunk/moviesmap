/* eslint-env es6 */
'use strict';
import React, { Component } from 'react';
import store from '../store';
import { init, switchMovie, resetMovie }  from '../actions';
import MovieSelector from './Selector';
import MoviesMap from './MoviesMap';

class SomeApp extends Component {
    dispatchChange(title) {
        title ?
            store.dispatch(switchMovie(title)) :
            store.dispatch(resetMovie());
    }
    
    render() {
        return (<div>
            <MovieSelector 
                titles={this.props.titles}
                className="title-select"
                handleChange={this.dispatchChange}
                value={this.props.movieTitle}
            />
            <MoviesMap 
                locations={this.props.locations} 
                movieTitle={this.props.movieTitle}
            />
        </div>);
    }

}

SomeApp.propTypes = {
    locations: React.PropTypes.object,
    movieTitle: React.PropTypes.string,
    titles: React.PropTypes.arrayOf(React.PropTypes.string)
};

class SomeAppContainer extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.setState({
                locations: store.getState().locations,
                titles: store.getState().titles
            })
        );

        store.dispatch(init());
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
            />
        );
    }
}

export default SomeAppContainer;