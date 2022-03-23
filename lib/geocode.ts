const HTTP_OK = 200

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const defaultMapsClient = require('@google/maps').createClient({
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  key: process.env.MAPS_KEY,
})

function geocodeAddress(
  address: any,
  {mapsClient = defaultMapsClient, responseProcessor = defaultResponseProcessor} = {},
) {
  return new Promise((resolve, reject) => {
    if (!address) {
      reject(new Error('Empty input'))
    }

    mapsClient.geocode(
      {
        address,
      },
      (err: any, response: any) => {
        if (err) {
          reject(err)
        } else if (!response) {
          reject('Empty response')
        } else if (response.status !== HTTP_OK) {
          reject(`Bad status: ${response.status}`)
        } else if (response.json.status !== 'OK') {
          reject(`Bad json status: ${response.json.status}`)
        } else {
          try {
            resolve(responseProcessor(response.json))
          } catch (e) {
            reject(e)
          }
        }
      },
    )
  });
}
/**
 * @type {Object} Point
 *
 * @prop {Number} lat
 * @prop {Number} lng
 */
/**
 * data format
 *  {
 *      results: [{
 *          addressComponents: [{}],
 *          formattedAddress: String,
 *          geometry: {
 *              bounds: {
 *                  northeast: Point,
 *                  southwest: Point
 *              },
 *              location: Point,
 *              location_type: String,
 *              viewport: {
 *                  northeast: Point,
 *                  southwest: Point
 *              }
 *          },
 *          place_id: String,
 *          types: String[]
 *      }],
 *      status: String "OK"
 *  }
 */

function defaultResponseProcessor(data: any) {
  return data.results[0].geometry.location
}

/**
 * @type {Object} MapsClient
 *
 * @prop {Function} geocode({address}, cb(err, cb))
 */

/**
 * @type {Object} Options
 * @prop {Function} [responseProcessor]
 * @prop {MapsClient} [mapsClient]
 */

/**
 * @prop {String} input to geocode
 * @prop {Options} optionsObject
 */
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = (input: any, optionsObject: any) => geocodeAddress(input, optionsObject)
