/**
 * AlertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    generate: async function(req, res){
        let alert;
        alert = await Alert.findOne({target_id:req.query.target_id, type: req.query.type});
        if (!alert){
            alert = await Alert.create(req.query).fetch();
            var msg = {verb:"created", data:alert}
            sails.sockets.blast('alert', msg);        
        }
        // let now = new Date();
        // setTimeout(function(){
        //     if(now - alert.createdAt >= 1*60*1000){
        //         Alert.update({id:alert.id},{resolved:true});
        //     }
        // },1*60*1000);

        res.json(alert);
    }
};

