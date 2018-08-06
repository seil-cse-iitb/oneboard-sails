/**
 * SensorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/*global Sensor*/
/*eslint no-undef: "error"*/
module.exports = {
    subscribe: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }

        sails.sockets.join(req.socket, req.query.location);
        console.log("New client connected to room "+req.query.location)
        return res.ok();
    },

    test: function(req, res){
        sails.sockets.broadcast('/kresit/2/205/', 'data', {"test":"Socket works"});
        return res.ok();
    }

};

