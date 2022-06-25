let session = require('express-session');
const pool = require('./database');
const PostgreSqlStore = require('connect-pg-simple')(session);

const sessionStore = new PostgreSqlStore({
	pool: pool,
	tableName: 'sessoes'
});

session({
	// eslint-disable-next-line no-undef
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 14 // 14 dias
	}
});

module.exports = session;