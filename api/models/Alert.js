/**
 * Alert.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    level: {
      type: 'string',
      description:'The criticality level of the alert ',
      required: true,
      maxLength: 10,
      example: 'danger',
      isIn: ['success', 'info', 'warn', 'danger'],
    },
    type: {
      type: 'string',
      description:'The type of alert ',
      required: true,
      maxLength: 20,
      example: 'battery_voltage',
    },
    title: {
      type: 'string',
      description:'Alert title',
      required: true,
      maxLength: 200,
      example: 'Sensor malfunction'
    },
    description: {
      type: 'string',
      description:'Alert large text description',
      required: false,
      maxLength: 1024,
      example: 'Sensor battery voltage is below minimum level. Sensor has shut down'
    },
    resolved: {
      type: 'boolean',
      description:'Whether the alert has been resolved or not ',
      defaultsTo: false,
      example: true,
    },
    target_id:{
      type: 'string',
      description:'The id of the object whose alert is generated ',
      required: true,
      maxLength: 100,
      example: 'temp_k_seil_l1_z1',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

