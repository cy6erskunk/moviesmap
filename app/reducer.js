import constants from './constants';
import _moviesData from './data.json';
import locations from './locations.json';

const moviesData = _moviesData.filter(m => m.locations);

const initialState = {
    title: '',
    markers: [],
    moviesData,
    locations
};

const reducer = (state = initialState, action) => {
    let filteredMoviesData = moviesData.filter(m => m.title === action.title);
    let filteredLocations = {};
    filteredMoviesData.forEach(m => filteredLocations[m.locations] = locations[m.locations]);

    switch (action.type) {        
    case constants.SWITCH_MOVIE:
        return { 
            title: action.title,
            markers: [],
            moviesData: filteredMoviesData,
            locations: filteredLocations
        };

    default:
        return state;
    }
};

export default reducer;
