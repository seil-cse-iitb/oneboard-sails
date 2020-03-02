var _ = require('lodash')
module.exports = {


  friendlyName: 'Check user permission',


  description:
    `Given a user, location and requested access level check whether the user has an access level >= the requested level.
  Iterate through all ancestors of the requested location and determine whether the user has an access level >= the requested level
  to any location in the ancestory`,


  inputs: {
    userId: {
      type: 'string',
      example: 'seil@cse.iitb.ac.in',
      description: 'The user id whose access we have to check.',
      required: true
    },
    accessLevel: {
      type: 'string',
      example: 'monitor',
      description: 'The access level the user has requested.',
      required: true
    },
    locationId: {
      type: 'number',
      example: 1,
      description: 'ID of the location to which permission is being requested.',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // If the user is super admin, then always allow
    let user = await User.findOne({emailAddress:inputs.userId});
    if(user && user.isSuperAdmin){
      return exits.success();
    }
    let ancestors = await Location.ancestors(inputs.locationId);
    let userAcl = await Acl.find({ userId: inputs.userId, accessLevel: { '>=': Acl.accessMap()[inputs.accessLevel] } });
    var match = _.intersectionWith(ancestors, userAcl, function (a, b) {
      return a.id === b.location;
    });
    if (match.length > 0) {
      return exits.success();
    }
    return exits.error();
  }
};

