import constants from './constants';
import clone from 'clone';

const initialState = {
    title: '',
    titles: [],
    moviesData: [],
    allLocations: {},
    locations: {},
    loadingData: false,
    loadingLocations: false,
    error: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {    

    case constants.REQUEST_MOVIES_DATA:
        return Object.assign({}, clone(state), {
            loadingData: true
        });

    case constants.REQUEST_LOCATIONS_DATA:
        return Object.assign({}, clone(state), {
            loadingLocations: true
        });

    case constants.RECEIVE_MOVIES_DATA:
        return action.error ? Object.assign({}, state, {
            error: action.error.toString(),
            loadingData: false
        }) : Object.assign({}, state, {
            loadingData: false,
            moviesData: action.data.filter(m => m.locations),
            titles: action.data
                        .filter(m => m.locations)
                        .reduce((prev, m) => {
                            if (!prev.includes(m.title)) {
                                prev.push(m.title);
                            }
                            return prev;
                        }, [])
        });

    case constants.RECEIVE_LOCATIONS_DATA:
        return action.error ? Object.assign({}, state, {
            error: action.error.toString(),
            loadingLocations: false
        }) : Object.assign({}, state, {
            loadingLocations: false,
            locations: action.data,
            allLocations: action.data
        });

    case constants.INIT_DATA:
        if (action.data && action.data.locations) {
            action.data.allLocations = clone(action.data.locations);
        }
        return Object.assign(
            {}, 
            clone(state),
            {
                title: initialState.title
            }, 
            action.data);

    case constants.SWITCH_MOVIE:

        return Object.assign({}, clone(state), { 
            title: action.title,
            moviesData: clone(state.moviesData),
            locations: clone(state.moviesData)
                .reduce((prev, m) => {
                    if (typeof state.allLocations[m.locations] !== 'undefined' && m.title === action.title) {
                        prev[m.locations] = state.allLocations[m.locations];
                    }
                    return prev;
                }, {})
        });

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
