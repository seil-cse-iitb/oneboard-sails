/**
 * EquipmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/*global Equipment*/
/*eslint no-undef: "error"*/
var mqtt = require('mqtt');
var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);

module.exports = {
  actuate: async function (req, res) {
    let equipment, location;
    equipment = await Equipment.findOne({ id: req.params.id }).populate("isLocatedIn");
    location = equipment.isLocatedIn;
    // Look for the passed in path on the filesystem
      var mqtt_topic = 'actuation/' + location.id + "/" + equipment.serial + "/";
      var mqtt_msg = req.body.msg;
      // console.log(location.properties.mqtt_broker_uri);
      var client = mqtt.connect(location.properties.mqtt_broker_uri);

      client.on('connect', function () {
        console.log(mqtt_topic);
        console.log(mqtt_msg);
        client.publish(mqtt_topic, mqtt_msg);
        client.end();
        res.json({ "message": "Message sent successfully" });
        // store the new state info into database
        equipment.properties.state = req.body.state;
        Equipment.update({ id: equipment.id }).set({ properties: equipment.properties }).exec(function (err, result) {

          sails.sockets.broadcast(location.id, 'equipment_actuation', { 'serial': equipment.serial, 'state': equipment.properties.state }); //broadcast the actuation event to front end using socket
        });
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

