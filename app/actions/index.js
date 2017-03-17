import constants from '../constants';

export const init = (data) => {
    return {
        type: constants.INIT_DATA,
        data
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