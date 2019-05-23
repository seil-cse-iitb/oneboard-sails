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

  // '*': 'is-logged-in',
  // '*': ['jwt-auth'],

  // "equipment/subscribe/*": [ 'acl'],
  // "equipmentGroup/subscribe/*" :['acl'],
  "alert": ["acl"],
  "location/*":['jwt-auth', 'acl'],
  "equipment/*": ['jwt-auth', 'acl'],
  "acl/*": ['jwt-auth', "prevent-trespassing"],
  // Bypass the `is-logged-in` policy for:
  'auth/verify': 'jwt-auth',
  'auth/*':true,

};
