/**
 * Sensor.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    serial: {
      type: 'string',
      description: 'A unique name constructed by humans following some rules to identify the object',
      required: true,
      maxLength: 200,
      example: 'power_k_sr'
    },
    name: {
      type: 'string',
      description:'A human understandable name for the object',
      required: true,
      maxLength: 200,
      example: 'Server Room Smart Meter'
    },
    type: {
      type: 'string',
      description:'The category of sensor',
      required: true,
      maxLength: 200,
      example: 'dht'
    },
    properties:{
      type: 'json',
      description:'A JSON describing UI meta data for this objects',
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    location: { // location where this sensor is installed
      model: 'location'
    },
    groups: { // cluster of equipments that this sensor is sensing
      collection: 'equipmentGroup',
      via: 'sensors'
    },
  },

};

