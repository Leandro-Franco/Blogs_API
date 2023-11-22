const { Category, BlogPost } = require('../models');

const postCheck = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const checkCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const check = await BlogPost.findOne({ where: { id } });
  if (!check) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  next();
};

const checkUser = async (req, res, next) => {
  const idUser = req.user;
  const { id } = req.params;
  console.log(idUser, id, 'CHECKING USER');
  if (idUser !== id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};
const checkUserToDELETE = async (req, res, next) => {
  const idUser = parseInt(req.user, 10);
  const { id } = req.params;
  const check = await BlogPost.findByPk(id);
  console.log(check.dataValues.userId, 'CHECKING USER DELETE', idUser);
  if (idUser !== check.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = { postCheck, checkCategory, checkId, checkUser, checkUserToDELETE };
