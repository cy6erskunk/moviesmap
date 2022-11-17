const HTTP_OK = 200;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_KEY
});

function geocodeAddress(
  address: any,
  {
    mapsClient = defaultMapsClient,
    responseProcessor = defaultResponseProcessor
  } = {}
) {
  return new Promise((resolve, reject) => {
    if (!address) {
      reject(new Error('Empty input'));
    }

    mapsClient.geocode(
      {
        address,
        key: process.env.MAPS_KEY
      },
      (err: any, response: any) => {
        if (err) {
          reject(err);
        } else if (!response) {
          reject('Empty response');
        } else if (response.status !== HTTP_OK) {
          reject(`Bad status: ${response.status}`);
        } else if (response.json.status !== 'OK') {
          reject(`Bad json status: ${response.json.status}`);
        } else {
          try {
            resolve(responseProcessor(response.json));
          } catch (e) {
            reject(e);
          }
        }
      }
    );
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
  return data.results[0].geometry.location;
}

type MapsClient = {
  geocode: (input: any, cb: any) => void;
};

type Options = {
  responseProcessor: (data: any) => any;
  mapsClient: MapsClient;
};

export default (input: string, optionsObject?: Options) =>
  geocodeAddress(input, optionsObject);
