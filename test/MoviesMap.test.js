/* eslint-env jasmine, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import MoviesMap from '../app/components/MoviesMap';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoviesMap/>, div);
});