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
  if (req.me) {
    console.log(req.me);
    // acl = await acl.find({user_id:req.query.target_id, type: req.query.type});
    return proceed();
  }
  else if(req.user){
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
    var authorized_locations = await sails.helpers.getAuthorizedLocationsForUser(req.user.data.username.toUpperCase(), requested_access_level, req.ip);
    
    for(var i in ancestors){
      for(var j in authorized_locations){
        if(ancestors[i].id === authorized_locations[j].id){
          return proceed();
        }
      }
    }
    return res.forbidden();

  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden();
};
