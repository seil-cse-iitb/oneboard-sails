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
    equipment_group = await EquipmentGroup.findOne({id:req.params.id}).populate("equipments").populate("location");
    location = equipment_group.location;

      var mqtt_topic = 'actuation/' + equipment_group.location.id + "/" + equipment_group.serial + "/";
      var mqtt_msg = req.body.msg;
      console.log(location.properties.mqtt_broker_uri);
      var client  = mqtt.connect(location.properties.mqtt_broker_uri);

      client.on('connect', function () {
        console.log(mqtt_topic);
        console.log(mqtt_msg);
        client.publish(mqtt_topic, mqtt_msg);
        client.end();
        // store the new state info into database
        equipment_group.properties.state = req.body.state;
        EquipmentGroup.update({id:equipment_group.id}).set({properties:equipment_group.properties}).exec(function (err, result) {

          sails.sockets.broadcast(equipment_group.location.id, 'equipment_group_actuation', { 'serial':equipment_group.serial, 'state': equipment_group.properties.state }); //broadcast the actuation event to front end using socket

          for(var i in equipment_group.equipments){
            var equipment = equipment_group.equipments[i];
            equipment.properties.state = equipment_group.properties.state;
            console.log("Updating "+equipment.id)
            Equipment.update({id:equipment.id}).set({properties:equipment.properties}).exec(function(err,result){});
            sails.sockets.broadcast(equipment.location.id, 'equipment_actuation', { 'serial':equipment.serial, 'state': equipment.properties.state }); //broadcast the actuation event to front end using socket

          }
        });
        res.json({"message":"Equipment Group actuated successfully"});
    });

  },
  subscribe: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, req.query.location);
    console.log("New client connected to room " + req.query.location)
    return res.ok();
  },

};


