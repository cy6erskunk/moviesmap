/* eslint-env jasmine, jest */
import updateMarkers from '../app/tools/updateMarkers';

const noop = () => ({});

const STUB = {
  locations: {},
  markers: [
    {
      setMap: noop
    }
  ]
};
it('does not throw', () => {
  expect(() => updateMarkers(null, STUB)).not.toThrow();
});
