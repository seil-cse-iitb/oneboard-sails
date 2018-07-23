/**
 * Equipment.js
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
      example: 'fan_k_201_1'
    },
    name: {
      type: 'string',
      description:'A human understandable name for the object',
      required: true,
      maxLength: 200,
      example: 'Fan 1 in room 201'
    },
    type: {
      type: 'string',
      description:'The category of equipment',
      required: true,
      maxLength: 200,
      example: 'fan'
    },
    location: {
      type: 'string',
      description:'The full path heirarchy for the location of the equipment',
      required: true,
      maxLength: 255,
      example: '/kresit/C/201'
    },
    properties:{
      type: 'json',
      description:'A JSON describing UI meta data for this objects',
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

