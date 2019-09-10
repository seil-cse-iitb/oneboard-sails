/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var request = require('request');
module.exports = {
    authenticate: async function (req, res){
        var user = await User.findOne({emailAddress:req.body.username});
        if (bcrypt.compareSync(req.body.password, user.password)){
            var token = jwt.sign({
                data: {username:user.emailAddress, isSuperAdmin:user.isSuperAdmin}
            }, sails.config.session.secret, { expiresIn: '365d' });

            // return the information including token as JSON
            res.send({
                message: 'Enjoy your token!',
                token: token
            });
        }
        else{
            return res.status(400).send({ message: "User not authenticated" });
        }
    },
    callback: async function (req, res) {
        var params = {
            grant_type: 'authorization_code',
            code: req.body.code,
            redirect_uri: req.body.redirectUri
        };
        var headers = {
            Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + sails.config.custom.iitbsso.clientSecret).toString('base64')
        };
        // console.log(params)
        request.post(sails.config.custom.iitbsso.tokenURI, { json: true, form: params, headers: headers }, function (err, response, body) {
            if (body.error) {
                return res.status(400).send({ message: body.error_description });
            }
            // /    body = JSON.parse(body)
            // console.log(body)
            request.get(sails.config.custom.iitbsso.userURI, { json: true, headers: { 'Authorization': 'Bearer ' + body.access_token } }, function (err, response, user) {
                // console.log(user)
                // if user is found and password is right
                // create a token
                user.isSuperAdmin = false;
                var token = jwt.sign({
                    data: user
                }, sails.config.session.secret, { expiresIn: body.expires_in + 's' });

                // return the information including token as JSON
                res.send({
                    message: 'Enjoy your token!',
                    token: token
                });
            })
        });
    },

    verify: async function(req, res){
        res.send(req.user);
    }
};

