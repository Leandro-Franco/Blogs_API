const express = require('express');
const loginControl = require('./controllers/login.controllers');
const { userAll, userFind, userAdd, userDel } = require('./controllers/user.controllers');
const { categoryAdd, categoryAll } = require('./controllers/category.controllers');
const { postAll, postId, postAtt, postAdd, postDel } = require('./controllers/post.controller');
const validations = require('./middlewares/auth.login');
const { postCheck, checkCategory,
  checkId, checkUser, checkUserToDELETE } = require('./middlewares/auth.post');
const { displayNameCheck, emailCheck, passwordCheck } = require('./middlewares/auth.user');
const checkToken = require('./middlewares/auth.JWT');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', checkToken, userAll);

app.delete('/user/me', checkToken, userDel);

app.get('/post', checkToken, postAll);

app.get('/post/:id', checkToken, checkId, postId);

app.put('/post/:id', checkToken, checkUser, postCheck, postAtt);

app.delete('/post/:id', checkToken, checkId, checkUserToDELETE, postDel);

app.get('/user/:id', checkToken, userFind);

app.post('/login', validations, loginControl);

app.post('/user', displayNameCheck, emailCheck, passwordCheck, userAdd);

app.post('/categories', checkToken, categoryAdd);

app.post('/post', checkToken, postCheck, checkCategory, postAdd);

app.get('/categories', checkToken, categoryAll);

// ...
// commit
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
