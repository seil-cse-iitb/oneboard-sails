var bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Register',


  description: 'Register auth.',


  inputs: {
    emailAddress: {
      description: 'The email ID of the user to register.',
      // By declaring a string example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a string.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    },
    password: {
      description: 'The plaintext password of the user to match with the hash stored in DB.',
      type: 'string',
      required: true
    },
    fullName: {
      description: 'The full name of the user to register.',
      // By declaring a string example, Sails will automatically respond with `res.badRequest`
      // if the `userId` parameter is not a string.
      type: 'string',
      // By making the `userId` parameter required, Sails will automatically respond with
      // `res.badRequest` if it's left out.
      required: true
    },
  },


  exits: {
    success: {
      responseType: 'created',
    },
    userExists: {
      description: 'A user with this username already exists.',
      responseType: 'badRequest',
      statusCode: 409
    }
  },


  fn: async function (inputs, exits) {
    const hash = bcrypt.hashSync(inputs.password, sails.config.saltRounds);

    //create user and insert into database
    try {
      let user = await User.create({ emailAddress: inputs.emailAddress, password: hash, fullName: inputs.fullName }).fetch();
      return exits.success(user);
    }
    // eslint-disable-next-line no-unused-vars
    catch (err) {
      return exits.userExists('A user with this username already exists.');
    }
  }
};
