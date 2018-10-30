var ip = require("ip")
module.exports = {

    friendlyName: 'Check location permission for user',


    description: 'Check whether a user has requested access to a given location',


    inputs: {

        user_id: {
            type: 'string',
            example: 'admin',
            description: 'The user id whose access we have to check.',
            required: true
        },
        location: {
            type: 'string',
            example: '/kresit',
            description: 'The location for which user is requesting access.',
            required: true
        },
        action: {
            type: 'string',
            example: 'operate',
            description: 'The access level the user has requested.',
            required: true
        },
        remoteAddress:{
            type: 'string',
            example: '10.129.149.1',
            description: 'IP address of the requesting user.',
            required: true

        }
    },


    fn: async function (inputs, exits) {
        let acl;
        var action_map = {
            "show" : 1,
            "operate" : 2,
            "admin" : 3
        }
        // console.log(inputs)
        acl = await Acl.find({ user_id: inputs.user_id.toUpperCase() });
        var granted = false;
        //perform ip checks
        var location_properties = await sails.helpers.getLocationProperties(inputs.location);
        var buf = new Buffer(16);
        var offset = 0;
        // ip.toBuffer(location_properties.local_ip.address, buf, offset);  // local_ip at the beginning
        
        if(location_properties.local_ip && ip.toString(buf) == ip.mask(inputs.remoteAddress, location_properties.local_ip.mask)){
            return exits.success(true);        
        }

        acl.forEach(permission => {
            if (inputs.location.indexOf(permission.location)>=0 && action_map[inputs.action] <= action_map[permission.action]){
                granted = true;
                console.log("granted for "+permission.id)
            }
        });
        return exits.success(granted);
    }

};