/*global Sensor*/
/*eslint no-undef: "error"*/
var temp_flag = false;
module.exports = {
  message: async function (topic, message, packet) {
    // sails.log.silly(topic, message.toString());
    // preprocess the incoming message to send to front end
    var topic_params = topic.toString().split("/");
    var message_params = message.toString().split(",");
    var sensors = {};
    switch (topic_params[2]) {
      case "temp":{
        //data/+/temp/#
        //Construct sensor_id = temp_k_<room>_<lane>_<zone>

        var sensor_id = 'temp_k_' + topic_params[3] + '_l' + message_params[2] + '_z' + message_params[1];

        if (typeof sensors[sensor_id] == 'undefined') {
          //this sensor is not present in our in-memory list of sensor. Need to lookup database and add it
          var sensor = await Sensor.findOne({ serial: sensor_id });

          if (!sensor) {
            //sensor not found in oneboard database. Ignore and carry on
            // console.log(sensor_id + ' not found');
            return;
          }
          sensors[sensor_id] = sensor; //insert newly discovered sensor into our local json
        }
        sails.sockets.broadcast(sensors[sensor_id].location, 'sensor_data', { 'serial':sensors[sensor_id].serial, 'temperature': Number(message_params[4]) }); //broadcast the data received from this sensor to front end using socket
        break;
      }
      case "dht":{
        //data/+/dht/#
        //Construct sensor_id = temp_k_<location>_<id>

        var sensor_id = 'temp_k_' + topic_params[3].toLowerCase() + message_params[1];

        if (typeof sensors[sensor_id] == 'undefined') {
          //this sensor is not present in our in-memory list of sensor. Need to lookup database and add it
          var sensor = await Sensor.findOne({ serial: sensor_id });

          if (!sensor) {
            //sensor not found in oneboard database. Ignore and carry on
            // console.log(sensor_id + ' not found');
            return;
          }
          sensors[sensor_id] = sensor; //insert newly discovered sensor into our local json
        }
        console.log({ 'serial':sensors[sensor_id].serial, 'temperature': Number(message_params[2]) })
        sails.sockets.broadcast(sensors[sensor_id].location, 'sensor_data', { 'serial':sensors[sensor_id].serial, 'temperature': Number(message_params[2]) }); //broadcast the data received from this sensor to front end using socket
        break;
      }
    }
  },

  connect: function (connack) {
    sails.log.info('service started....');
    temp_flag = true;
  },

  reconnect: function () {
    if (temp_flag) {
      sails.log.info('reconnecting....');
      temp_flag = false;
    }

  },

  close: function () {
    if (temp_flag) {
      sails.log.info('service closed');
      temp_flag = false;
      return;
    }
  },

  offline: function () {
    if (temp_flag) {
      sails.log.info('broker is offline');
      //temp_flag = false;
    }
  },

  error: function (error) {
    sails.log.info('\n\n\nSome thing went wrong!!\n\n\n', error);
  },

  packetsend: function (packet) {
    // sails.log.info('packetsend', packet.cmd);

  },

  packetreceive: function (packet) {
    // sails.log.info('packetreceive', packet.cmd);
  }
};
