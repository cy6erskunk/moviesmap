/* eslint-env jasmine, jest */
import updateMarkers from '../app/tools/updateMarkers'

const noop = () => ({})

const STUB = {
  locations: {},
  markers: [
    {
      setMap: noop,
    },
  ],
}
// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('does not throw', () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
  expect(() => updateMarkers(null, STUB)).not.toThrow()
})
