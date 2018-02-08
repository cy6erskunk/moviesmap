/* eslint-env jasmine, jest */
import deepFreeze from 'deep-freeze'

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

describe('geocode', () => {
  it('should return Promise', () => {
    const result = geocode()
    expect(result instanceof Promise).toBe(true)
    result.then(undefined, () => {}) // handle promise rejection to avoid warning
  })

  it(
    'fails on falsy input',
    done => {
      geocode().catch(reason => {
        expect(reason instanceof Error).toBe(true)
        expect(reason.message).toEqual('Empty input')
        done()
      })
    },
    DEFAULT_TEST_TIMEOUT,
  )

  it('uses custom geocoder when provided', () => {
    const options = {
      mapsClient: {
        geocode: jest.fn((input, cb) => {
          cb(null, dummyResponse)
        }),
      },
    }

    return geocode('whatever', options).then(
      () => expect(options.mapsClient.geocode.mock.calls.length).toBe(1),
      err => expect(err).toBeNull(),
    ) // to fail immediately if Promise gets rejected
  })

  it('fails on error returned from geocoder', () => {
    const dummyError = 'dummy error'
    const options = {
      mapsClient: {
        geocode: (input, cb) => cb(dummyError, undefined),
      },
    }

    return geocode('whatever', options).catch(reason => {
      expect(reason).toEqual(dummyError)
    })
  })

  it('fails on empty response', () => {
    const options = {
      mapsClient: {
        geocode: (input, cb) => cb(null, undefined),
      },
    }

    return geocode('whatever', options).catch(reason => {
      expect(reason).toEqual('Empty response')
    })
  })

  it('fails on response.status !== 200', () => {
    const anotherDummyResponse = Object.assign({}, dummyResponse, {
      status: HTTP_ERROR,
    })

    const options = {
      mapsClient: {
        geocode: (input, cb) => cb(null, anotherDummyResponse),
      },
    }

    return geocode('whatever', options).catch(reason => {
      expect(reason).toEqual(`Bad status: ${anotherDummyResponse.status}`)
    })
  })

  it('fails on response.json.status !== "OK"', () => {
    const anotherDummyResponse = Object.assign({}, dummyResponse, {
      json: {status: HTTP_OK},
    })

    const options = {
      mapsClient: {
        geocode: (input, cb) => cb(null, anotherDummyResponse),
      },
    }

    return geocode('whatever', options).catch(reason => {
      expect(reason).toEqual(`Bad json status: ${anotherDummyResponse.json.status}`)
    })
  })

  it('uses custom processor when provided', () => {
    const processorMock = jest.fn()
    const options = {
      mapsClient: {
        geocode: jest.fn((input, cb) => {
          cb(null, dummyResponse)
        }),
      },
      responseProcessor: processorMock,
    }

    return geocode('whatever', options).then(
      () => expect(processorMock.mock.calls.length).toBe(1),
      err => expect(err).toBeNull(),
    )
  })
})
