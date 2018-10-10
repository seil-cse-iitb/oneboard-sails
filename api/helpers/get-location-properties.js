var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);
module.exports = {

    friendlyName: 'Get location properties',


    description: 'Fetch properties object for requested location from file stored in disk.',


    inputs: {

        location: {
            type: 'string',
            example: '/kresit',
            description: 'The location whose properties are to be fetched.',
            required: true
        },
    },


    fn: async function (inputs, exits) {
        let properties_file_path = sails.config.location_root + inputs.location + 'properties.json';
        if (await fileExists(properties_file_path)) {
            var data = await readFile(properties_file_path);
            var location_properties = JSON.parse(data);
            return exits.success(location_properties);
        }
        return exits.error();
    }

};