const express = require('express');
const rotas = require('./routes/routePessoas');
const errorHandler = require('./middlewares/errorHandler');
const session = require('express-session');
const sessionConfig = require('../../config/session'); // objeto com configurações de sessão
const PostgreSqlStore = require('connect-pg-simple')(session); // para armazenamento de sessão
const pool = require('../../config/database'); // para armazenamento de sesssão

const app = express();

// armazenamento de sessão
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

// roda servidor
app.listen(4000);