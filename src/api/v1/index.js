const express = require('express');
const rotas = require('./routes/routePessoas');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/', rotas);
app.use(errorHandler);

app.listen(4000);