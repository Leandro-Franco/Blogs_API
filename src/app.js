const express = require('express');
const loginControl = require('./controllers/login.controllers');
const { userAll, userFind, userAdd } = require('./controllers/user.controllers');
const { categoryAdd, categoryAll } = require('./controllers/category.controllers');
const validations = require('./middlewares/auth.login');
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

app.get('/user/:id', checkToken, userFind);

app.post('/login', validations, loginControl);

app.post('/user', displayNameCheck, emailCheck, passwordCheck, userAdd);

app.post('/categories', checkToken, categoryAdd);

app.get('/categories', checkToken, categoryAll);

// ...
// commit
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
