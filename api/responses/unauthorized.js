/**
 * unauthorized.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 *     // -or-
 *     return res.unauthorized(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function unauthorized(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 401;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.unauthorized()');
    return res.sendStatus(statusCodeToSet);
  }

  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send(optionalData);
  }

};
