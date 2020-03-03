/**
 * has-control-permission
 *
 * Look up the access control list for the logged-in user and determine whether she has monitor permission to the requested location.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */

module.exports = async function (req, res, proceed) {

  let userId = await sails.helpers.getUserIdFromRequest(req);
  let locationId = req.query.isLocatedIn;
  // If the user is super admin, then always allow
  if(req.user.isSuperAdmin){
    return proceed();
  }
  try{
    await sails.helpers.checkUserPermission(userId, 'monitor', locationId)
    return proceed();
  }
  catch(err){
    return res.forbidden();
  }
};
