/**
 * acl
 *
 * Access Control List(ACL) for oneboard. Allows users to see, operate or administer locations and equipment based on pre-defined access restrictions.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  // We need to look up the users acl from acl model.
  let user_id;
  if (req.me) {
    user_id = req.me.emailAddress;
    // If request is from a super admin, let it through

    if(req.me.isSuperAdmin){
      proceed();
    }
  }
  else if(req.user){
    user_id = req.user.data.username.toUpperCase();
  }
  // If request contains same user id as logged in user, allow it.
  if(req.query.user_id && req.query.user_id.toUpperCase() != user_id.toUpperCase()){
    return res.forbidden();
  }
  //--•
  // Otherwise, logged in user is trying to access data that does not belong to him/her.
  return proceed();
};
