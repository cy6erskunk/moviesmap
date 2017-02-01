/* eslint-env es6, jasmine */
describe('geocode', () => {
    let geocode = require('../lib/geocode');

    it('should resturn Promise', () => {
        expect(geocode() instanceof Promise).toBe(true);
    });

    it('fails on falsy input', (done) => {
        geocode()
            .catch(reason => {
                expect(reason instanceof Error).toBe(true);
                expect(reason.message).toEqual('Empty input');
                done();
            });
    }, 100);
})