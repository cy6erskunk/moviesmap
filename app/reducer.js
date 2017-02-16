import constants from './constants';
import _moviesData from './data.json';
import locations from './locations.json';
import clone from 'clone';

const moviesData = _moviesData.filter(m => m.locations);
const titles = moviesData.reduce((prev, m) => {
    if (!prev.includes(m.title)) {
        prev.push(m.title);
    }
    return prev;
}, []);

const initialState = {
    title: '',
    titles,
    moviesData,
    locations
};

const reducer = (state = initialState, action) => {
    let filteredMoviesData = clone(moviesData);
    let filteredLocations = {};

    switch (action.type) {        
    case constants.SWITCH_MOVIE:
        filteredMoviesData = filteredMoviesData.filter(m => m.title === action.title);
        filteredMoviesData.forEach(m => filteredLocations[m.locations] = locations[m.locations]);

        return { 
            title: action.title,
            titles,
            moviesData: filteredMoviesData,
            locations: filteredLocations
        };

    case constants.RESET_MOVIE:
        return clone(initialState);

    default:
        return state;
    }
};

export default reducer;
