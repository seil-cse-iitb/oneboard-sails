/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find : async function (req, res){
    console.log(req.user);
    var locations = await sails.helpers.getAuthorizedLocationsForUser(req.user.data.username.toUpperCase(), 'show', req.ip);
    res.json(locations);
  },

  descendants : async function (req, res){
    let descendants = await Location.descendants(req.params.id);
    res.json(descendants);
  }
};

