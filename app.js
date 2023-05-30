const express = require('express');
const csrf = require('csurf');
const path = require('path');

const app = express();

const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const handleErrorsMiddleware = require('./middlewares/error-handling');
const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(handleErrorsMiddleware);

app.use(authRoutes);

db.connectToDatabase()
  .then(() => {
    app.listen(8080);
  })
  .catch((e) => console.log('Failed to connect to the database : ', e));
