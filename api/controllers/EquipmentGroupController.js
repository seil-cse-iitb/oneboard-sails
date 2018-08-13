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
    let equipment_group;
    equipment_group = await EquipmentGroup.findOne({id:req.params.id}).populate("equipments");
    let properties_file_path = sails.config.location_root + equipment_group.location + 'properties.json';
    // Look for the passed in path on the filesystem
    if (await fileExists(properties_file_path)){
      var data = await readFile(properties_file_path);
      var location_properties = JSON.parse(data);
      var mqtt_topic = 'actuation' + equipment_group.location + equipment_group.serial + "/";
      var mqtt_msg = req.body.msg;
      console.log(location_properties.mqtt_broker_uri);
      var client  = mqtt.connect(location_properties.mqtt_broker_uri);

      client.on('connect', function () {
        console.log(mqtt_topic);
        console.log(mqtt_msg);
        client.publish(mqtt_topic, mqtt_msg);
        client.end();
        // store the new state info into database
        equipment_group.properties.state = req.body.state;
        EquipmentGroup.update({id:equipment_group.id}).set({properties:equipment_group.properties}).exec(function (err, result) {

          sails.sockets.broadcast(equipment_group.location, 'equipment_group_actuation', { 'serial':equipment_group.serial, 'state': equipment_group.properties.state }); //broadcast the actuation event to front end using socket

          for(var i in equipment_group.equipments){
            var equipment = equipment_group.equipments[i];
            equipment.properties.state = equipment_group.properties.state;
            console.log("Updating "+equipment.id)
            Equipment.update({id:equipment.id}).set({properties:equipment.properties}).exec(function(err,result){});
            sails.sockets.broadcast(equipment.location, 'equipment_actuation', { 'serial':equipment.serial, 'state': equipment.properties.state }); //broadcast the actuation event to front end using socket

          }
        });
        res.json({"message":"Equipment Group actuated successfully"});
    });
    }
    else{
      res.json(400, {"error":"location does not exist"});
    }

  }

};


