/**
 * Location.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
    properties:{
      type: 'json',
      description:'A JSON meta data for this objects',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    children: {
      collection: 'location',
      via: 'parents'
    },
    parents: {
      collection: 'location',
      via: 'children'
    },
    acls: {
      collection : 'acl',
      via: 'location'
    },
    hasEquipments: {
      collection: 'equipment',
      via: 'isLocatedIn'
    },
    containsPoints: { 
      collection: 'point',
      via:'isLocatedIn',
      description: 'points which are physically located in this location'
    },
    hasAttachedPoints :{ 
      collection: 'point',
      via: 'isPointOfLocations',
      description: 'points which are attached to this location (measures something, alerts something about this location).'
    }
  },
  ancestors: async function (id) {
    var location = await Location.findOne({ id: id }).populate("parents");
    var ancestors=[location];
    
    if (!location) {
      throw require('flaverr')({
        message: `Location does not exist.`,
        code: 'E_UNKNOWN_LOCATION'
      });
    }
    for(var i in location.parents){
      
      ancestors = ancestors.concat(await Location.ancestors(location.parents[i].id));
    }
    return ancestors;
  },

  descendants: async function (id) {
    var location = await Location.findOne({ id: id }).populate("children");
    var descendants=[location];
    
    if (!location) {
      throw require('flaverr')({
        message: `Location does not exist.`,
        code: 'E_UNKNOWN_LOCATION'
      });
    }
    for(var i in location.children){
      
      descendants = descendants.concat(await Location.descendants(location.children[i].id));
    }
    return descendants;
  },
  
};

