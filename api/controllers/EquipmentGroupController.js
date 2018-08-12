/**
 * EquipmentGroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/*global Equipment*/
/*global EquipmentGroup*/
/*eslint no-undef: "error"*/
var mqtt = require('mqtt');
var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);

module.exports = {
  actuate: async function(req, res){
    let equipment;
    equipment = await Equipment.findOne({id:req.params.id});
    let properties_file_path = sails.config.location_root + equipment.location + 'properties.json';
    // Look for the passed in path on the filesystem
    if (await fileExists(properties_file_path)){
      var data = await readFile(properties_file_path);
      var location_properties = JSON.parse(data);
      var mqtt_topic = 'actuation' + equipment.location + equipment.serial;
      var mqtt_msg = req.body.msg;
      console.log(location_properties.mqtt_broker_uri);
      var client  = mqtt.connect(location_properties.mqtt_broker_uri);

      client.on('connect', function () {
        console.log(mqtt_topic);
        console.log(mqtt_msg);
        // client.publish(mqtt_topic, mqtt_msg);
        client.end();
        res.json({"message":"Message sent successfully"});
        // store the new state info into database
        equipment.properties.state = req.body.state;
        Equipment.update({id:equipment.id}).set({properties:equipment.properties}).exec(function (err, result) {
          // console.log(result)
        });
    });
    }
    else{
      res.json(400, {"error":"location does not exist"});
    }

  }

};


