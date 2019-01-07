var ip = require("ip")
module.exports = {

    friendlyName: 'Convert a location URI to human readable name',


    description: 'Given a location URI, convert it to a breadcrumb representation of the same string',


    inputs: {

        location: {
            type: 'string',
            example: '/kresit/2/213/',
            description: 'The location which has to be converted to name',
            required: true
        }
    },


    fn: async function (inputs, exits) {
        var levels = inputs.location.split("/")
        levels.splice(-1);
        var name=levels.join(" -> ");
        return exits.success(name);
    }

};