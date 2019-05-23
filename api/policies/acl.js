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
  // console.log(req.connection.remoteAddress)
  let user_id;
  if (req.me) {
    console.log(req.me);
    user_id = req.me.emailAddress;
    if(req.me.isSuperAdmin){
      proceed();
    }
  }
  else if(req.user){
    user_id = req.user.data.username.toUpperCase();
  }
  let requested_access_level;
  if(req.method==='GET'){
    requested_access_level='show';
  }
  else{ 
    requested_access_level='operate';
  }
  if (!req.query.location){
    console.log('no location');
    return proceed();
  }

  //Check whether requesting user has required access level to the location. Compare authorized locations for this user with all ancestors of requested location
  var ancestors = await Location.ancestors(req.query.location);
  var authorized_locations = await sails.helpers.getAuthorizedLocationsForUser(user_id, requested_access_level, req.ip);
  
  for(var i in ancestors){
    for(var j in authorized_locations){
      if(ancestors[i].id === authorized_locations[j].id){
        return proceed();
      }
    }
  }
  return res.forbidden();

};
