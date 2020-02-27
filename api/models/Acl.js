/**
 * Acl.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
/*global Acl, Location*/

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    userId: {
      type: 'string',
      description: 'Unique user identifier. ',
      required: true,
      maxLength: 200,
      example: '17305r005'
    },
    accessLevel: {
      type: 'number',
      description:'The access level given to this user for this location. A lower number implies higher access level. 0 means super user',
      required: true,
      example: '2',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    location: {
      model: 'location',
    },
  },

  // functions
  userHasAccess: async function(userId, location){
    //return what permission a given user has for a given location. A user has the highest permission assigned to the closest ancestor
    let acl;
    acl = await Acl.findOne({userId:userId, location:location}).populate('location');
    if (acl){
      return acl.access_level;
    }
    var l = await Location.findOne({id:location}).populate('parents');
    var minPerm = Number.MAX_SAFE_INTEGER;
    for(var i in l.parents){
      var parent = l.parents[i];
      var al = await Acl.user_has_access(userId, parent.id);
      if(al && al<minPerm){
        minPerm = al;
      }
    }

    return minPerm < Number.MAX_SAFE_INTEGER ? minPerm : null;
  }

};

