/* eslint-env es6 */
/* global google */
'use strict';
import React, { Component } from 'react';
import { render } from 'react-dom';
import constants from './constants';
import store from './store';
import MovieSelector from './Selector';
import MoviesMap from './MoviesMap';

import moviesData from './data.json';

let titles = moviesData.reduce((prev, next) => {
    if (next.title && !prev.includes(next.title)) {
        prev.push(next.title);
    }
    return prev;
}, []);

class SomeApp extends Component {
    render() {
        return (<div>
            <MovieSelector titles={titles} className="title-select"
                handleChange={ (title) => store.dispatch({ type: constants.SWITCH_MOVIE, title }) }/>
            <MoviesMap locations={this.props.locations}/>
        </div>);
    }

}

class SomeAppContainer extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.setState({locations: store.getState().locations})
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <SomeApp
                locations={ store.getState().locations }
            />
        );
    }
}

render(<SomeAppContainer/>, document.querySelector('.app-container'))

