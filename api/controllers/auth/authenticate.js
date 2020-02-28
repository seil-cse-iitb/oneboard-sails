
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
module.exports = {
    friendlyName: 'Authenticate user',
    description: 'Authenticate a user using her username and password and return a JWT if authentication succeeds',
    inputs: {
        username: {
            description: 'The email ID of the user to look up.',
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
        }
    },

    exits: {
        success: {
            responseType: 'ok',
        },
        invalidCredentials: {
            description: 'Invalid username or password.',
            responseType: 'unauthorized'
        }
    },

    fn: async function (inputs, exits) {
        var user = await User.find({ emailAddress: inputs.username });
        user=user[0];
        if(!user){
            return exits.invalidCredentials('Invalid username or password.');
        }
        if (bcrypt.compareSync(inputs.password, user.password)) {
            var token = jwt.sign({
                data: { username: user.emailAddress, isSuperAdmin: user.isSuperAdmin, name: user.fullName }
            }, sails.config.session.secret, { expiresIn: '365d' });

            // return the information including token as JSON
            return exits.success({
                message: 'Enjoy your token!',
                token: token
            });
        }
        else {
            return exits.invalidCredentials('Invalid username or password.');
        }
    }
};