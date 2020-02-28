var jwt = require('jsonwebtoken');
var request = require('request');
module.exports = async function (req, res) {
  const params = {
    // eslint-disable-next-line camelcase
    grant_type: 'authorization_code',
    code: req.body.code,
    // eslint-disable-next-line camelcase
    redirect_uri: req.body.redirectUri
  };
  const headers = {
    Authorization: 'Basic ' + new Buffer(req.body.clientId + ':' + sails.config.custom.iitbsso.clientSecret).toString('base64')
  };
  request.post(sails.config.custom.iitbsso.tokenUri, { json: true, followAllRedirects: true, strictSSL: false, form: params, headers: headers }, (err, response, body) => {
    // console.log(body);
    if (err) {
      return res.status(500).send(err);
    }
    if (!body) {
      return res.status(500).send({ 'message': 'No response from OAuth server' });
    }
    if (body.error) {
      return res.status(400).send({ message: body.error_description });
    }
    // body = JSON.parse(body)
    request.get(sails.config.custom.iitbsso.userUri, { json: true, followAllRedirects: true, strictSSL: false, headers: { 'Authorization': 'Bearer ' + body.access_token } }, (err, response, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      // console.log(user);
      // if user is found and password is right
      // create a token
      const token = jwt.sign({
        data: user
      }, sails.config.session.secret, { expiresIn: body.expires_in + 's' });

      // return the information including token as JSON
      res.send({
        message: 'Enjoy your token!',
        token: token
      });
    });
  });
};
