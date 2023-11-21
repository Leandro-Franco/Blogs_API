const { Category } = require('../models');

const allCategory = async () => {
  const all = await Category.findAll();
  return { status: 200, response: all };
};

const addCategory = async (objCategory) => {
  const { name } = objCategory;
  if (!name) {
    return { status: 400, response: { message: '"name" is required' } };
  }
  const createdCategory = await Category.create({ name });
  return { status: 201, response: createdCategory };
};

module.exports = { addCategory, allCategory };