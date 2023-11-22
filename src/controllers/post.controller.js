const { addPost, idPost, allPost } = require('../services/post.services');

const postAll = async (req, res) => {
  const post = await allPost();
  return res.status(post.status).json(post.response);
};

const postId = async (req, res) => {
  const { id } = req.params;
  const post = await idPost(id);
  return res.status(post.status).json(post.response);
};

const postAdd = async (req, res) => {
  const id = parseInt(req.user, 10);
  const objPost = req.body;
  const post = await addPost(objPost, id);
  return res.status(post.status).json(post.response);
};

module.exports = { postAll, postAdd, postId };