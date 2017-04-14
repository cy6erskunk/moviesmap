/* eslint-env es6 */
'use strict';
import React from 'react';
import { render } from 'react-dom';
import SomeAppContainer from './components/App';
import store from './store';
import { init, fetchData } from './actions';

render(<SomeAppContainer/>, document.querySelector('.app-container'));

Promise.all(
    [
        fetch('locations.json').then(response => response.json()),
        store.dispatch(fetchData())
    ])
    .then(([locations]) => {

        store.dispatch(init({
            locations
        }));
    });