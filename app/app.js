/* eslint-env es6 */
'use strict';
import React from 'react';
import { render } from 'react-dom';
import SomeAppContainer from './components/App';
import store from './store';
import { init, fetchMoviesData, fetchLocationsData } from './actions';

render(<SomeAppContainer/>, document.querySelector('.app-container'));

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