const express = require('express');
const loginControl = require('./controllers/login.controllers');
const validations = require('./middlewares/auth.login');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validations, loginControl);

// ...
// commit
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
