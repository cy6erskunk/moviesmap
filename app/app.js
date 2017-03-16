/* eslint-env es6 */
'use strict';
import React, { Component } from 'react';
import { render } from 'react-dom';
import SomeAppContainer from './components/App';
import _moviesData from './data.json';
import locations from './locations.json';

const moviesData = _moviesData.filter(m => m.locations);
const titles = moviesData.reduce((prev, m) => {
    if (!prev.includes(m.title)) {
        prev.push(m.title);
    }
    return prev;
}, []);

render(<SomeAppContainer/>, document.querySelector('.app-container'));