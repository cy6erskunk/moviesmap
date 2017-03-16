import constants from './constants';
import clone from 'clone';

const initialState = {
    title: '',
    titles: [],
    moviesData: [],
    allLocations: {},
    locations: {}
};

const reducer = (state = initialState, action) => {

    switch (action.type) {    
    case constants.INIT_DATA:

        if (!action.data) {
            action.data = initialState;
        }

        return Object.assign({}, {
            title: '',
            titles: clone(action.data.titles),
            allLocations: clone(action.data.locations),
            moviesData: clone(action.data.moviesData),
            locations: clone(action.data.moviesData)
                .reduce((prev, m) => {
                    if (typeof action.data.locations[m.locations] !== 'undefined') {
                        prev[m.locations] = action.data.locations[m.locations];
                    }
                    return prev;
                }, {})});

    case constants.SWITCH_MOVIE:

        return { 
            title: action.title,
            titles: clone(state.titles),
            moviesData: clone(state.moviesData),
            allLocations: state.allLocations,
            locations: clone(state.moviesData)
                .reduce((prev, m) => {
                    if (typeof state.allLocations[m.locations] !== 'undefined' && m.title === action.title) {
                        prev[m.locations] = state.allLocations[m.locations];
                    }
                    return prev;
                }, {})
        };

    case constants.RESET_MOVIE:
        return Object.assign({},
            clone(state), {
                title: '',
                locations: state.allLocations
            });

    default:
        return state;
    }
};

export default reducer;
