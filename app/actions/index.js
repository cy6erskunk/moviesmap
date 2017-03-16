import constants from '../constants';

export const init = () => {
    return {
        type: constants.INIT_DATA
    };
};

export const switchMovie = title => {
    return { 
        type: constants.SWITCH_MOVIE, 
        title
    };
};

export const resetMovie = () => {
    return { type: constants.RESET_MOVIE };
};