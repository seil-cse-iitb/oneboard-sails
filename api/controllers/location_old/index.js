var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);

module.exports = {

    friendlyName: 'Location meta',
 
    description: 'Find the location specified by the path parameter in the filesystem and return the properties.json file along with child directories information',
 
    inputs: {
       location: {
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
 
    fn: async function (inputs, exits, ctx) {

      if(inputs.location=='/'){
         // requesting home page. return list of locations that this user is allowed to access from 1. ACL and 2. IP based location
         var root = {
            "name":"root",
            "children":[]
         }
         var acls = await  Acl.find({
            where: {user_id:ctx.req.user.data.username.toUpperCase()},
            select: ['location']
          });

         for(var i in acls){
            var name = await sails.helpers.locationToName(acls[i].location);
            root.children.push({
               name:name,
               location:acls[i].location
            })
         }
         return exits.success(root);
      }
         // console.log(ctx.req.user);
        let properties_file_path = sails.config.location_root + inputs.location + "properties.json";
       // Look for the passed in path on the filesystem
       if (await fileExists(properties_file_path)){
            return exits.success(await readFile(properties_file_path));
       }
       else{
           return exits.notFound();
       }
    }
 };