/* eslint-env node, es6 */
let mapsClient = require('@google/maps').createClient({
    key: process.env.MAPS_KEY
});

function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        if (!address) {
            reject(new Error('Empty input'));
        }

        mapsClient.geocode({
            address
        }, (err, response) => {
            if (err) {
                reject(err);
            } else if (!response) {
                reject('Empty response');
            } else if (response.status !== 200) {
                reject(`Bad status: ${response.status}`);
            } else if (response.json.status !== 'OK') {
                reject(`Bad json status: ${response.json.status}`);
            } else {
                try {
                    resolve(processResponse(response.json));
                } catch (e) {
                    reject(e);
                }
            }
        });
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

function processResponse(data) {
    return data.results[0].geometry.location;
}

module.exports = input => {
    return geocodeAddress(input);
};