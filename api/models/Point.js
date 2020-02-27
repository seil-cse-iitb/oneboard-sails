/**
 * Point.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    pointType: {
      type: 'string',
      description: 'The subclass type of this point',
      required: true,
      maxLength: 200,
      isIn: ['sensor', 'alert', 'actuator'],
      example: 'sensor'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    isPointOfLocations: {
      collection: 'location',
      via: 'hasAttachedPoints',
      description: 'Locations that this point is attached to (measures something, alerts something about this location).'
    },
    isLocatedIn: {
      model: 'location',
      description: 'Location this point is physically located in.'
    },

    isPointOfEquipments: {
      collection: 'equipment',
      via: 'hasAttachedPoints',
      description: 'Equipments that this point is attached to (measures something, alerts something about this equipment).'
    },
    isPartOf: {
      model: 'equipment',
      description: 'Equipment this point is physically part of.'
    },

    // sensor:{
    //   collection: 'sensor',
    //   via: 'point',
    //   description: 'The sensor that this point represents.'
    // },
    alerts: {
      collection: 'alert',
      via:'target'
    },
    affiliated: {
      collection: '*',
    },
  },

};

