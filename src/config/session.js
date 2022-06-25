/* const pool = require('./database');
const PostgreSqlStore = require('connect-pg-simple')(session); */

require('dotenv').config();

// indica tabela no banco de dados para guardar sessões
/* const sessionStore = new PostgreSqlStore({
	pool: pool,
	tableName: 'sessoes'
}); */

// objeto de configuração das sessões
const sessionConfig = {
	// eslint-disable-next-line no-undef
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	//store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 14 // 14 dias
	}
};

module.exports = sessionConfig;