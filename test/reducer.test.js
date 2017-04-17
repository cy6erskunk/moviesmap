/* eslint-env jest */
import reducer from '../app/reducers/movies';
import constants from '../app/constants';
import deepFreeze from 'deep-freeze';

describe('reducer', () => {
    it('requires action', () => {
        expect(reducer).toThrow();
        expect(() => {
            reducer(null, {});
        }).not.toThrow();
    });
    
    it('returns default state', () => {
        let result = reducer(undefined, {});

        expect(result).toBeTruthy();
        expect(result.title).toBe('');
        expect(result.error).toBe('');
    });

    it('switches state', () => {
        let title = '180';
        let result = reducer(undefined, { type: constants.SWITCH_MOVIE, title });

        expect(result).toBeTruthy();
        expect(result.title).toBe(title);
        expect(result.error).toBe('');

        result = reducer(result, { type: constants.SWITCH_MOVIE, title });
        expect(result.title).toBe(title);
        expect(result.error).toBe('');
    });

    it('ignores duplicate calls', () => {
        let title = '180';
        let firstState = reducer(undefined, { type: constants.SWITCH_MOVIE, title });
        deepFreeze(firstState);
        let secondState = reducer(firstState, { type: constants.SWITCH_MOVIE, title });
        
        expect(firstState).toEqual(secondState);
    });

    it('RESET_MOVIE returns default state', () => {
        let title = '180';
        let defaultState = deepFreeze(reducer(undefined, {}));
        let intermediateState = deepFreeze(reducer(defaultState, { type: constants.SWITCH_MOVIE, title }));
        let result = reducer(intermediateState, { type: constants.RESET_MOVIE });
        
        expect(result).toEqual(defaultState);
    });

    it('does not reset error', () => {
        let errorMsg = 'something error-like';
        let state = reducer(undefined, {type: constants.RECEIVE_MOVIES_DATA, error: errorMsg});
        let result = reducer(state, {type: constants.INIT_DATA});
        expect(result.error).toEqual(errorMsg);
    });

    it('updates allLocations on init, does not remove', () => {
        let locations = {
            '555 Market St.': {
                'lat': 37.7899844,
                'lng': -122.3999366
            },
            'Embarcadero Freeway': {
                'lat': 37.7489402,
                'lng': -122.3928481
            }};
        let result = reducer(undefined, {type: constants.INIT_DATA, data: {locations}});
        expect(result.allLocations).toEqual(locations);
    });

    it('updates allLocations on init, does not remove', () => {
        let locations = {
            '555 Market St.': {
                'lat': 37.7899844,
                'lng': -122.3999366
            },
            'Embarcadero Freeway': {
                'lat': 37.7489402,
                'lng': -122.3928481
            }};
        let result = reducer(undefined, {type: constants.INIT_DATA, data: {locations}});
        result = reducer(result, {type: constants.INIT_DATA, data: {locations}});
        expect(result.allLocations).toEqual(locations);
    });

    it('does not resets allLocations', () => {
        let title = '180';
        let locations = {
            '555 Market St.': {
                'lat': 37.7899844,
                'lng': -122.3999366
            },
            'Embarcadero Freeway': {
                'lat': 37.7489402,
                'lng': -122.3928481
            }};
        let result = reducer(undefined, {type: constants.INIT_DATA, data: {locations}});
        result = reducer(result, {type: constants.RECEIVE_MOVIES_DATA, data: []});

        expect(result.allLocations).toEqual(locations);
        result = reducer(result, {type: constants.SWITCH_MOVIE, title});
        expect(result.allLocations).toEqual(locations);
    });
});