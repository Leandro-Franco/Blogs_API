const displayNameCheck = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8 || !displayName) { 
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email) || !email) { 
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

const passwordCheck = async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6 || !password) { 
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = { displayNameCheck, emailCheck, passwordCheck };