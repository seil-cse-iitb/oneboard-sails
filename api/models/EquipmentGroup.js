/**
 * EquipmentGroup.js
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
      description: 'A location unique name constructed by humans following some rules to identify the object',
      required: true,
      maxLength: 200,
      example: 'Z1L'
    },
    name: {
      type: 'string',
      description:'A human understandable name for the object',
      required: true,
      maxLength: 200,
      example: 'All fans'
    },
    // location: {
    //   type: 'string',
    //   description:'The full path heirarchy for the location of the equipment group',
    //   required: true,
    //   maxLength: 255,
    //   example: '/kresit/C/201'
    // },
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
    equipments: {
      collection: 'equipment',
      via: 'groups'
    },
    location: {
      model: 'location'
    }
  },

};

