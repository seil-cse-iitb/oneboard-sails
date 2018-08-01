/**
 * SensorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    subscribe: function (req, res) {
        if (!req.isSocket) {
            return res.badRequest();
        }

        sails.sockets.join(req.socket, 'feed');
        console.log("New client connected")
        return res.ok();
    },

    test: function(req, res){
        sails.sockets.broadcast('feed', 'new_entry', {"test":"Socket works"});
        return res.ok();
    }

};

