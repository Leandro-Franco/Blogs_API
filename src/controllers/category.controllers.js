const { addCategory, allCategory } = require('../services/categories.services');

const categoryAll = async (_req, res) => {
  const category = await allCategory();
  return res.status(category.status).json(category.response);
};

const categoryAdd = async (req, res) => {
  const objCategory = req.body;
  const category = await addCategory(objCategory);
  return res.status(category.status).json(category.response);
};

module.exports = { categoryAll, categoryAdd };