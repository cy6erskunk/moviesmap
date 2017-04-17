/* eslint-env es6 */
'use strict';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { render } from 'react-dom';
import SomeApp from './components/App';
import store from './store';
import { init, fetchMoviesData, fetchLocationsData } from './actions';


const mapStateToProps = (state) => (
    {
        locations: state.locations,
        titles: state.titles,
        movieTitle: state.title,
        loadingData: state.loadingData,
        loadingLocations: state.loadingLocations,
        error: state.error
    }
);

const SomeAppContainer = connect(mapStateToProps)(SomeApp);

render(
    <Provider store={store}>
        <SomeAppContainer/>
    </Provider>, document.querySelector('.app-container'));

Promise.all(
    [
        store.dispatch(fetchLocationsData()),
        store.dispatch(fetchMoviesData())
    ])
    .then(([locations]) => {
        store.dispatch(init({
            locations
        }));
    });