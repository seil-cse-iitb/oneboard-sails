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
        let acl;
        console.log(req.me);
        // acl = await acl.find({user_id:req.query.target_id, type: req.query.type});
      return proceed();
    }
    else if(req.user){
        let action;
        if(req.method=='GET')
            action='show';
        else 
            action='operate';
        if (!req.query.location){
            console.log("no location")
            return proceed();
        }
        var result = await sails.helpers.checkLocationPermission(req.user.data.username.toUpperCase(), req.query.location, action, req.ip);
        if( result)
            return proceed();
        else
            return res.forbidden();

    }
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();
  
  };
  