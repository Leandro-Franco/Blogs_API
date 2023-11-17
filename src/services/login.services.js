const { User } = require('../models');
const newtoken = require('../utils/tokenCreator');

const login = async (loginObj) => {
  const { email, password } = loginObj;
  const user = await User.findOne({ where: { email } });
  // console.log(user);

  if (!user || user.dataValues.password !== password) {
    return { status: 400, response: { message: 'Invalid fields' },
    }; 
  }

  // if (!user || user.dataValues.password !== password) {
  //   return { status: 400, response: { message: 'Invalid fields' },
  //   }; 
  // }

  const { id } = user.dataValues;
  const token = await newtoken(id);
  return { status: 200, response: { token } };
};

module.exports = login;