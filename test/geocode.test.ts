/* eslint-env jasmine, jest */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'deep... Remove this comment to see the full error message
import deepFreeze from 'deep-freeze'
import 'core-js/modules/es.object.assign'

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const geocode = require('../lib/geocode')

const HTTP_OK = 200
const HTTP_ERROR = 500
const DEFAULT_TEST_TIMEOUT = 100

const dummyResponse = {
  status: HTTP_OK,
  json: {
    status: 'OK',
    results: [{geometry: {location: null}}],
  },
}

deepFreeze(dummyResponse)

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('geocode', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return Promise', () => {
    const result = geocode()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result instanceof Promise).toBe(true)
    result.then(undefined, () => {}) // handle promise rejection to avoid warning
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it(
    'fails on falsy input',
    (done: any) => {
      geocode().catch((reason: any) => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(reason instanceof Error).toBe(true)
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(reason.message).toEqual('Empty input')
        done()
      })
    },
    DEFAULT_TEST_TIMEOUT,
  )

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('uses custom geocoder when provided', () => {
    const options = {
      mapsClient: {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        geocode: jest.fn((input: any, cb: any) => {
          cb(null, dummyResponse)
        }),
      },
    }

    return geocode('whatever', options).then(
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      () => expect(options.mapsClient.geocode.mock.calls.length).toBe(1),
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      (err: any) => expect(err).toBeNull(),
    ); // to fail immediately if Promise gets rejected
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('fails on error returned from geocoder', () => {
    const dummyError = 'dummy error'
    const options = {
      mapsClient: {
        geocode: (input: any, cb: any) => cb(dummyError, undefined),
      },
    }

    return geocode('whatever', options).catch((reason: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(reason).toEqual(dummyError)
    });
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('fails on empty response', () => {
    const options = {
      mapsClient: {
        geocode: (input: any, cb: any) => cb(null, undefined),
      },
    }

    return geocode('whatever', options).catch((reason: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(reason).toEqual('Empty response')
    });
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('fails on response.status !== 200', () => {
    const anotherDummyResponse = Object.assign({}, dummyResponse, {
      status: HTTP_ERROR,
    })

    const options = {
      mapsClient: {
        geocode: (input: any, cb: any) => cb(null, anotherDummyResponse),
      },
    }

    return geocode('whatever', options).catch((reason: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(reason).toEqual(`Bad status: ${anotherDummyResponse.status}`)
    });
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('fails on response.json.status !== "OK"', () => {
    const anotherDummyResponse = Object.assign({}, dummyResponse, {
      json: {status: HTTP_OK},
    })

    const options = {
      mapsClient: {
        geocode: (input: any, cb: any) => cb(null, anotherDummyResponse),
      },
    }

    return geocode('whatever', options).catch((reason: any) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(reason).toEqual(`Bad json status: ${anotherDummyResponse.json.status}`)
    });
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('uses custom processor when provided', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
    const processorMock = jest.fn()
    const options = {
      mapsClient: {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        geocode: jest.fn((input: any, cb: any) => {
          cb(null, dummyResponse)
        }),
      },
      responseProcessor: processorMock,
    }

    return geocode('whatever', options).then(
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      () => expect(processorMock.mock.calls.length).toBe(1),
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      (err: any) => expect(err).toBeNull(),
    );
  })
})
