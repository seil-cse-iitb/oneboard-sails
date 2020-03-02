module.exports = {


  friendlyName: 'Get user from request',


  description: 'Parse the incoming request object and extract the userId of the currently logged in user',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'User from request',
    },

  },


  fn: async function (inputs, exits) {
    let userId;
    userId = inputs.req.user.emailAddress || inputs.req.user.email || inputs.req.user.username;
    if(userId==undefined){
      return exits.error('No userId specified.');
    }
    // Send back the result through the success exit.
    return exits.success(userId.toLowerCase());

  }


};

