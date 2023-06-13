const express = require('express');
const csrf = require('csurf');
const path = require('path');
const expressSession = require('express-session');

const app = express();

const createSessionConfig = require('./config/session');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handling');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(productRoutes);
app.use(baseRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(8080);
  })
  .catch((e) => console.log('Failed to connect to the database : ', e));
