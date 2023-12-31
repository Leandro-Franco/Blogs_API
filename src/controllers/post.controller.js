const { allPost, idPost, attPost, addPost, delPost } = require('../services/post.services');

const postAll = async (req, res) => {
  const post = await allPost();
  return res.status(post.status).json(post.response);
};

const postId = async (req, res) => {
  const { id } = req.params;
  const post = await idPost(id);
  return res.status(post.status).json(post.response);
};

const postAtt = async (req, res) => {
  // const id = parseInt(req.user, 10);
  const { id } = req.params;
  const objPost = req.body;
  const post = await attPost(objPost, id);
  return res.status(post.status).json(post.response);
};

const postAdd = async (req, res) => {
  const id = parseInt(req.user, 10);
  const objPost = req.body;
  const post = await addPost(objPost, id);
  return res.status(post.status).json(post.response);
};

const postDel = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;
  const del = await delPost(id, userId);
  return res.status(del.status).end();
};

module.exports = { postAll, postId, postAtt, postAdd, postDel };