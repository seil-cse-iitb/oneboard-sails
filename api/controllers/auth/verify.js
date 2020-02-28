module.exports = async function (req, res) {
  // Verify whether a user is logged in using a JWT and return the logged in user\'s details if successful
  res.send(req.user);

}