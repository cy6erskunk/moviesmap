/* eslint-env es6 */
'use strict';
import React, { Component } from 'react';
import { render } from 'react-dom';
import constants from './constants';
import store from './store';
import MovieSelector from './Selector';
import MoviesMap from './MoviesMap';

import clone from 'clone';

import _moviesData from './data.json';
import locations from './locations.json';

const moviesData = _moviesData.filter(m => m.locations);
const titles = moviesData.reduce((prev, m) => {
    if (!prev.includes(m.title)) {
        prev.push(m.title);
    }
    return prev;
}, []);

class SomeApp extends Component {
    dispatchChange(title) {
        title ?
            store.dispatch({ type: constants.SWITCH_MOVIE, title }) :
            store.dispatch({ type: constants.RESET_MOVIE });
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

        store.dispatch({ type: constants.INIT_DATA, data: {
            titles,
            moviesData,
            locations
        }})
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

render(<SomeAppContainer/>, document.querySelector('.app-container'));