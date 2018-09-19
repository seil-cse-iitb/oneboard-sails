/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'auth/verify': 'jwt-auth',
  'auth/*':true,
  // 'entrance/*': true,
  // 'account/logout': true,
  // 'view-homepage-or-redirect': true,
  // 'deliver-contact-form-message': true,
  'sensor/*':true,
  'equipment/*':true,
  'equipmentGroup/*':true,
  'location/*':true,
  'alert/*':true

};
