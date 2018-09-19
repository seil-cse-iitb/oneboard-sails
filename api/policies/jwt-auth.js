// Will return 401 HTTP status code if any errors occurred.
// policies/jwtAuth.js
module.exports = require('jwt-policy')({ secret: sails.config.session.secret });