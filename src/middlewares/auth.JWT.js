const jwt = require('jsonwebtoken');

const login = require('../services/login.services');

const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

function extractToken(baererToken) {
  return baererToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const baererToken = req.body('Authorization');

  if (!baererToken) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  const token = extractToken(baererToken);

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await login.getByUserId(decoded.data.userId);
  
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};