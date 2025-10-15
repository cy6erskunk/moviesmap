/* eslint-env jasmine, jest */
import updateMarkers from '../app/tools/updateMarkers';

const STUB = {
  locations: {},
  markers: [
    {
      map: null
    }
  ]
};
it('does not throw', () => {
  expect(() => updateMarkers(null, STUB)).not.toThrow();
});
