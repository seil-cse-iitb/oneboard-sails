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

  LocationController:{
    'find':['jwt-auth'],
    'findOne': ['jwt-auth','can-monitor-location'],
    'create':['jwt-auth','is-super-admin'],
    'update':['jwt-auth','is-super-admin'],
    'destroy':['jwt-auth','is-super-admin'],
  },
  SymLocation:{
    'find':['jwt-auth', 'can-filter-by-location'],
    'create':['jwt-auth','is-super-admin'],
    'update':['jwt-auth','is-super-admin'],
    'destroy':['jwt-auth','is-super-admin'],
    '*':false,
  },
  AclController:{
    '*':['jwt-auth', "prevent-trespassing"],
  },
  EquipmentController:{
    'find':['jwt-auth', 'can-filter-by-location'],
    'findOne': ['jwt-auth','can-monitor-equipment'],
    'create':['jwt-auth','is-super-admin'],
    'update':['jwt-auth','is-super-admin'],
    'destroy':['jwt-auth','is-super-admin'],
    'actuate':['jwt-auth','can-control-equipment'],
    'subscribe':['jwt-auth','can-monitor-equipment'],
  },
  "alert": false,
  
  // Bypass the `is-logged-in` policy for:
  'auth/verify': 'jwt-auth',
  'auth/*':true,

};
