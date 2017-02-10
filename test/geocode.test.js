/* eslint-env jasmine, jest */
import deepFreeze from 'deep-freeze';
let geocode = require('../lib/geocode');
let dummyResponse = {
    status: 200,
    json: {
        status: 'OK',
        results: [{geometry: {location: null}}]
    }
};

deepFreeze(dummyResponse);

describe('geocode', () => {

    it('should return Promise', () => {
        let result = geocode();
        expect(result instanceof Promise).toBe(true);
        result.then(undefined, () => {}); // handle promise rejection to avoid warning
    });

    it('fails on falsy input', (done) => {
        geocode()
            .catch(reason => {
                expect(reason instanceof Error).toBe(true);
                expect(reason.message).toEqual('Empty input');
                done();
            });
    }, 100);

    it('uses custom geocoder when provided', () => {
        let options = {
            mapsClient: { 
                geocode: jest.fn((input, cb) => {cb(null, dummyResponse);})
            }
        };

        return geocode('whatever', options)
            .then(
                () => expect(options.mapsClient.geocode.mock.calls.length).toBe(1),
                err => expect(err).toBeNull()); // to fail immediately if Promise gets rejected
    });

    it ('fails on error returned from geocoder', () => {
        let dummyError = 'dummy error';
        let options = {
            mapsClient: { 
                geocode: (input, cb) => cb(dummyError, undefined)
            }
        };

        return geocode('whatever', options)
                .catch(reason => {
                    expect(reason).toEqual(dummyError);
                });
    });

    it('fails on empty response', () => {
        let options = {
            mapsClient: { 
                geocode: (input, cb) => cb(null, undefined)
            }
        };

        return geocode('whatever', options)
            .catch(reason => {
                expect(reason).toEqual('Empty response');
            });

    });

    it('fails on response.status !== 200', () => {
        let anotherDummyResponse = Object.assign({}, dummyResponse, {
            status: 500
        });

        let options = {
            mapsClient: { 
                geocode: (input, cb) => cb(null, anotherDummyResponse)
            }
        };

        return geocode('whatever', options)
            .catch(reason => {
                expect(reason).toEqual(`Bad status: ${anotherDummyResponse.status}`);
            });
    });

    it('fails on response.json.status !== "OK"', () => {
        let anotherDummyResponse = Object.assign({}, dummyResponse, {
            json: {status: 200}
        });

        let options = {
            mapsClient: { 
                geocode: (input, cb) => cb(null, anotherDummyResponse)
            }
        };

        return geocode('whatever', options)
            .catch(reason => {
                expect(reason).toEqual(`Bad json status: ${anotherDummyResponse.json.status}`);
            });
    });


    it('uses custom processor when provided', () => {
        let processorMock = jest.fn();
        let options = {
            mapsClient: {geocode: jest.fn((input, cb) => {cb(null, dummyResponse);})},
            responseProcessor: processorMock
        };
        
        return geocode('whatever', options)
            .then(() => expect(processorMock.mock.calls.length).toBe(1),
                err => expect(err).toBeNull());
    });
});