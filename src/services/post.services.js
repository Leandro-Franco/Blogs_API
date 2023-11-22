const { BlogPost, PostCategory, User, Category } = require('../models');

const allPost = async () => {
  const post = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    // through já trabalha aliminando o que é comum na tabela relacional do blogPost (postCategoryID e post ID)
  ] });
  return { status: 200, response: post };
};

const idPost = async (id) => {
  const post = await BlogPost.findOne({ where: ({ id }),
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    // through já trabalha aliminando o que é comum na tabela relacional do blogPost (postCategoryID e post ID)
    ] });
  return { status: 200, response: post };
};

const addPost = async (objPost, userId) => {
  const { title, content, categoryIds } = objPost;
  const post = { title,
    content,
    userId,
    published: new Date(),
    updated: new Date() };
  console.log(post, 'ON SERVICES');
  const newPost = await BlogPost.create(post);
  const postscategories = categoryIds
    .map((categoryId) => ({ postId: newPost.dataValues.id, categoryId }));
  await PostCategory.bulkCreate(postscategories);
  return { status: 201, response: newPost };
};

module.exports = { allPost, idPost, addPost };