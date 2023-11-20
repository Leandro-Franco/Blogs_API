const jwt = require('jsonwebtoken');

// const login = require('../services/login.services');

const checkToken = async (req, res, next) => {
  const Authorization = req.header('Authorization');
  console.log(Authorization);
  const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';
  const extractToken = (token) => token.split(' ')[1];
  
  if (!Authorization || Authorization === '') {
    return res.status(401).json({ error: 'Token not found' });
  }
  try {
    const token = extractToken(Authorization);
    jwt.verify(token, SECRET);
    // const user = await user.getByUserId(decoded.data.userId);
  
    // if (!user) {
    //   return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    // }
  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = checkToken;