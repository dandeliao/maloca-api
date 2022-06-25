const express = require('express');
const rotas = require('./routes/routePessoas');
const errorHandler = require('./middlewares/errorHandler');
const session = require('express-session');
const sessionConfig = require('../../config/session');
const PostgreSqlStore = require('connect-pg-simple')(session); // deve ser movido para /src/config/session.js
const pool = require('../../config/database'); // deve ser movido para /src/config/session.js

const app = express();

// --- este trecho (sessionStore e sessionConfig.store) deve ser movido para /src/config/session.js
const sessionStore = new PostgreSqlStore({
	pool: pool,
	tableName: 'sessoes'
});
sessionConfig.store = sessionStore;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sessionConfig));
app.use('/', rotas);
app.use(errorHandler);

app.listen(4000);