/* eslint-env es6 */
/* global google */
'use strict';
import React, { Component } from 'react';
import { render } from 'react-dom';
import constants from './constants';
import store from './store';
import MovieSelector from './Selector';
import MoviesMap from './MoviesMap';

class SomeApp extends Component {
    render() {
        return (<div>
            <MovieSelector titles={this.props.titles} className="title-select"
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
                titles={ store.getState().titles }
            />
        );
    }
}

render(<SomeAppContainer/>, document.querySelector('.app-container'))

