const login = require('../services/login.services');

const loginControl = async (req, res) => {
  const userObj = req.body;
  const token = await login(userObj);
  // console.log(token);
  return res.status(token.status).json(token.response);
};
module.exports = loginControl;