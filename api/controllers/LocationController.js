/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find : async function (req, res){
    if(req.user.isSuperAdmin){
      let locations = await Location.find({isLocatedIn:null});
      return res.json(locations);
    }
    let userId = await sails.helpers.getUserIdFromRequest(req);
    let acl = await Acl.find({ userId: userId}).populate('location');
    let locations = _.map(acl,'location');
    return res.json(locations);
  },

  children : async function (req, res){
    let children = await Location.find({isLocatedIn:req.params.id});
    return res.json(children);
  },

  descendants : async function (req, res){
    let descendants = await Location.descendants(req.params.id);
    return res.json(descendants);
  },

  ancestors : async function (req, res){
    let ancestors = await Location.ancestors(req.params.id);
    return res.json(ancestors);
  },

  path : async function (req, res){
    let path = await Location.path(req.params.id);
    return res.json(path);
  }
};

