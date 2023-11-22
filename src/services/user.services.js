const { User } = require('../models');
const newtoken = require('../utils/tokenCreator');

const allUser = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] } });
  return { status: 200, response: users };
};

const findUser = async (id) => {
  // é possivel usar 'find by pk{pk, {_outro comando_}}'
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user || user === '') { 
    return { status: 404, response: { message: 'User does not exist' } }; 
  }
  return { status: 200, response: user };
};

const newUser = async (userObj) => {
  const { displayName, email, password, image } = userObj;
  const userCheck = await User.findOne({ where: { email } });
  if (userCheck) {
    return { status: 409, response: { message: 'User already registered' } };
  }
  const createdUser = await User.create({ displayName, email, password, image,
  });
  const payload = createdUser.dataValues.id;
  const token = await newtoken(payload);
  return { status: 201, response: { token } };
};

const delUser = async (id) => {
  await User.destroy({ where: { id } });
  return { status: 204 };
};

module.exports = { newUser, findUser, allUser, delUser };