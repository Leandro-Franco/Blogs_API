const { Category, BlogPost } = require('../models');

const postCheck = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const checkCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const check = await BlogPost.findOne({ where: { id } });
  console.log(check);
  if (!check) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  next();
};

module.exports = { postCheck, checkCategory, checkId };
