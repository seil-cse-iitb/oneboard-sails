var ip = require('ip');
module.exports = {
  friendlyName: 'Get list of locations that a given user is allowed to access',

  description: 'Find authorized locations by filtering acl by user id and checking request IP against all locations\' network',


  inputs: {

    userId: {
      type: 'string',
      example: 'admin',
      description: 'The user id whose access we have to check.',
      required: true
    },
    accessLevel: {
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
      'show' : 3,
      'operate' : 2,
      'admin' : 1
    };
    let acls, networked_locations, address, netmask, buf, offset;
    var locations=[];
    acls = await Acl.find({ userId: inputs.userId.toUpperCase(), accessLevel: { '<': action_map[inputs.accessLevel] }}).populate("location");
    for(var i in acls){
      locations.push(acls[i].location);
    }
    // IP based location filtering
    networked_locations = await Location.find({network:{ '!=': null }});
    for(var i in networked_locations){
      address = networked_locations[i].network.address;
      netmask = networked_locations[i].network.netmask;
      buf = new Buffer(16);
      offset = 0;  
      console.log("remoteAddress: "+ inputs.remoteAddress);
      console.log("After masking: "+ip.mask(inputs.remoteAddress, netmask));
      ip.toBuffer(address, buf, offset);  // local_ip at the beginning
      console.log("Buf: " + ip.toString(buf));
      if( address && ip.toString(buf) === ip.mask(inputs.remoteAddress, netmask)){
        locations.push(networked_locations[i]);
      }
    }
    return exits.success(locations);
  }

};