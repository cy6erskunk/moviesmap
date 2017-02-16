/* eslint-env jest */
import reducer from '../app/reducer';
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
    });

    it('switches state', () => {
        let title = '180';
        let result = reducer(undefined, { type: constants.SWITCH_MOVIE, title });

        expect(result).toBeTruthy();
        expect(result.title).toBe(title);
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
});