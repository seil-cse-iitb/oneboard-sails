/**
 * EquipmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/*global Equipment*/
/*eslint no-undef: "error"*/
module.exports = {
  actuate: async function(req, res){
      let equipment;
      equipment = await Equipment.findOne({id:req.params.id});
      let mqtt_topic = equipment.location + "/" + equipment.serial;
      let mqtt_msg = req.data.msg;
      res.json({"yo":equipment});
  }

};

