/**
 * AclController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  has_access: async function(req, res){
    var access_level = await Acl.user_has_access(req.user.data.username, req.params.location);
    res.json({access_level:access_level});
  }

};

