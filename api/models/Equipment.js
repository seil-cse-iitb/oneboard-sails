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
    properties:{
      type: 'json',
      description:'A JSON describing meta data for this objects',
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    
    isLocatedIn: {
      model: 'location'
    },
    children: {
      collection: 'equipment',
      via: 'parents'
    },
    parents: {
      collection: 'equipment',
      via: 'children'
    },
    containsPoints: { 
      collection: 'point',
      via:'isPartOf',
      description: 'Points which are physically part of this equipment'
    },
    hasAttachedPoints :{ 
      collection: 'point',
      via: 'isPointOfEquipments',
      description: 'Points which are attached to this equipment (measures something, alerts something about this equipment).'
    }
  },

};

