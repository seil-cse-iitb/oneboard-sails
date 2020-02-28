/**
 * created.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.created();
 *     // -or-
 *     return res.created(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'created'
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

module.exports = function created(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 201;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.created()');
    return res.sendStatus(statusCodeToSet);
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send(optionalData);
  }

};
