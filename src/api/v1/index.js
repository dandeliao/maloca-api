const express = require('express');

const app = express();

app.use(express.json());
app.use('/', require('./routes/routePessoas'));

app.listen(4000);