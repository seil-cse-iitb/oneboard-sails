var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);

module.exports = {

    friendlyName: 'Location meta',
 
    description: 'Find the location specified by the path parameter in the filesystem and return the properties.json file along with child directories information',
 
    inputs: {
       path: {
         description: 'The full absolute path of the location',
         // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
         // if the `userId` parameter is not a number.
         type: 'string',
         // By making the `userId` parameter required, Sails will automatically respond with
         // `res.badRequest` if it's left out.
         required: true
       }
    },
 
    exits: {
       success: {
         responseType: '',
        //  viewTemplatePath: 'pages/welcome'
       },
       notFound: {
         description: 'No location with the specified path found on the system',
         responseType: 'notFound'
       }
    },
 
    fn: async function (inputs, exits) {
        let properties_file_path = sails.config.location_root + inputs.path + "/properties.json";
       // Look for the passed in path on the filesystem
       if (await fileExists(properties_file_path)){
            return exits.success(await readFile(properties_file_path));
       }
       else{
           return exits.notFound();
       }
    }
 };