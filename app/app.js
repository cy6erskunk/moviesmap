/* eslint-env es6 */
'use strict';
import React from 'react';
import { render } from 'react-dom';
import SomeAppContainer from './components/App';
import store from './store';
import { init } from './actions';

render(<SomeAppContainer/>, document.querySelector('.app-container'));
Promise.all(
    [
        fetch('locations.json').then(response => response.json()),
        fetch('data.json').then(response => response.json())
    ])
    .then(([locations, _moviesData]) => {
        const moviesData = _moviesData.filter(m => m.locations);
        const titles = moviesData.reduce((prev, m) => {
            if (!prev.includes(m.title)) {
                prev.push(m.title);
            }
            return prev;
        }, []);

        store.dispatch(init({
            titles,
            locations,
            moviesData
        }));
    });