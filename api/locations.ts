const locations = require('../public/locations.json')

module.exports = (req, res) => res.json(locations)
