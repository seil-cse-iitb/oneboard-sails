/**
 * Thing.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
      description:'A human understandable name for the Thing',
      required: true,
      maxLength: 200,
      example: '201 Fan 1'
    },
    row: {
      type: 'number',
      description: 'The table row in which to display the Thing in BMS dashboard',
      required: false,
      example: '1',
      allowNull: true,
    },
    column: {
      type: 'number',
      description: 'The table column in which to display the Thing in BMS dashboard',
      required: false,
      example: '1',
      allowNull: true,

    },
    rowspan: {
      type: 'number',
      description: 'The number of table rows the Thing will span in BMS dashboard',
      required: false,
      example: '1',
      allowNull: true,
    },
    colspan: {
      type: 'number',
      description: 'The number of table columns the Thing will span in BMS dashboard',
      required: false,
      example: '1',
      allowNull: true,
    },
    orientation: {
      type: 'string',
      description: 'The orientation of the UI component of the Thing in BMS dashboard',
      isIn: ['horizontal', 'vertical'],
      required: false,
      example: 'horizontal',
      allowNull: true,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

