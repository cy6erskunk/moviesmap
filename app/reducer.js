import constants from './constants';
import clone from 'clone';

const initialState = {
    title: '',
    titles: [],
    moviesData: [],
    locations: {}
};

const reducer = (state = initialState, action) => {

    switch (action.type) {    
    case constants.INIT_DATA:

        return Object.assign({title: ''}, 
            clone(action.data),                    
            clone(action.data.moviesData)
                .reduce((prev, m) => {
                    prev[m.locations] = action.data.locations[m.locations]
                    return prev;
                }, {}));

    case constants.SWITCH_MOVIE:

        return { 
            title: action.title,
            titles: clone(state.titles),
            moviesData: clone(state.moviesData),
            locations: clone(state.moviesData)
                .reduce((prev, m) => {
                    if (!action.title || m.title === action.title) {
                        prev[m.locations] = state.locations[m.locations]
                    }
                    return prev;
                }, {})
        };

    case constants.RESET_MOVIE:
        return clone(initialState);

    default:
        return state;
    }
};

export default reducer;
