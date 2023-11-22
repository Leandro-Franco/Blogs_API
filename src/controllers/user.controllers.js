const { allUser, findUser, newUser, delUser } = require('../services/user.services');

const userAll = async (_req, res) => {
  const all = await allUser();
  return res.status(all.status).json(all.response);
};

const userFind = async (req, res) => {
  const { id } = req.params;
  const user = await findUser(id);
  return res.status(user.status).json(user.response);
};

const userAdd = async (req, res) => {
  const userObj = req.body;
  const user = await newUser(userObj);
  
  return res.status(user.status).json(user.response);
};

const userDel = async (req, res) => {
  const id = req.user;
  const del = await delUser(id);
  return res.status(del.status).end();
};
module.exports = { userAll, userFind, userAdd, userDel };