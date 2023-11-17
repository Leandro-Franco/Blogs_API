const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';
const newtoken = (payload) => jwt.sign(payload, SECRET);
module.exports = newtoken;