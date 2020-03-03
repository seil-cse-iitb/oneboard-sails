/**
 * Location.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
/*global Location*/

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      description: 'Location human readable name',
      required: true,
      maxLength: 200,
      example: 'SIC213'
    },
    network: {
      type: 'json',
      description: 'IPv4 network address and netmask of the network at the location. Used for authorizing location based access.',
      required: false
    },
    properties: {
      type: 'json',
      description: 'A JSON meta data for this objects',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    children: {
      collection: 'location',
      via: 'isLocatedIn'
    },
    isLocatedIn: {
      model: 'location'
    },
    symchildren: {
      collection: 'symlocation',
      via: 'isLocatedIn'
    },
    symlocations:{
      collection: 'symlocation',
      via:'target'
    },
    acls: {
      collection: 'acl',
      via: 'location'
    },
    hasEquipments: {
      collection: 'equipment',
      via: 'isLocatedIn'
    },
    containsPoints: {
      collection: 'point',
      via: 'isLocatedIn',
      description: 'points which are physically located in this location'
    },
    hasAttachedPoints: {
      collection: 'point',
      via: 'isPointOfLocations',
      description: 'points which are attached to this location (measures something, alerts something about this location).'
    }
  },
  ancestors: async function (id) {
    if(!id){
      return;
    }
    var location = await Location.findOne({ id: id }); //Fetch the details about this location
    var symlocations = await SymLocation.find({target:id}); // Fetch details about links to this location
    var parents = _.map(symlocations,'isLocatedIn'); //Create a parents array composed of parents of all symlocations 
    parents = _.union(parents, [location.isLocatedIn]); // and this location
    var ancestors = [location];

    if (!location) {
      throw require('flaverr')({
        message: `Location does not exist.`,
        code: 'E_UNKNOWN_LOCATION'
      });
    }
    for (var i in parents) {
      ancestors = _.union(ancestors, await Location.ancestors(parents[i]));
    }
    ancestors = _.uniq(ancestors, 'id');
    return ancestors;
  },

  descendants: async function (id) {
    var location = await Location.findOne({ id: id }).populate('children'); //Fetch the details about this location
    var symlocations = await SymLocation.find({isLocatedIn:id}).populate('target'); // Fetch details about symlocations under this location
    var children = _.map(symlocations, 'target'); //Create a children array composed of all symlocations 
    children = _.union(children, location.children); // and this location's children
    var descendants = [location];

    if (!location) {
      throw require('flaverr')({
        message: `Location does not exist.`,
        code: 'E_UNKNOWN_LOCATION'
      });
    }
    for (var i in children) {
      if(!children[i]){
        continue;
      }
      descendants = _.union(descendants, await Location.descendants(children[i].id));
    }
    descendants = _.uniq(descendants, 'id');
    return descendants;
  },

  path: async function (id){
    let location = await Location.findOne({ id: id }); //Fetch the details about this location
    let path = [location];
    if(location.isLocatedIn){
      path = _.union(path, await Location.path(location.isLocatedIn));
    }
    return path;
  }

};

