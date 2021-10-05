const express = require('express');
const Joi = require('joi');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// dados
const pessoas = [
    {
        id: 0,
        nome: "dani",
        comunidades: ["radio-maloca", "filmes"],
        html: "<h1 style='font-size:32px'>Oi! Sou Dani :)</h1><marquee>bem-vinde à minha página pessoal</marquee>"
    }
];


// routing
app.get('/', (req, res) => res.send('está vivo!'));

app.get('/api/pessoas', (req, res) => {
    res.send(pessoas);
});

app.get('/api/pessoas/:nome', (req, res) => {
    const pessoa = pessoas.find((p) => p.nome == req.params.nome);
    if (!pessoa) return res.status(404).send(`A pessoa chamada ${req.params.nome} não foi encontrada`);
    res.send(pessoa);
});

app.post('/api/pessoas', (req, res) => {

    const validacao = validaPessoa(req.body);
    if (validacao.error) return res.status(400).send(validacao.error.details[0].message);

    const pessoa = {
        id: pessoas.length,
        nome: validacao.value.nome,
        comunidades: validacao.value.comunidades,
        html: validacao.value.html
    };
    pessoas.push(pessoa);
    res.send(pessoa);
});

app.put('/api/pessoas/:nome', (req, res) => {
    const pessoa = pessoas.find((p) => p.nome == req.params.nome);
    if (!pessoa) return res.status(404).send(`A pessoa chamada ${req.params.nome} não foi encontrada`);

    const { error } = validaPessoa(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.keys(pessoa).forEach((chave) => {
        if (req.body[chave]) {
            pessoa[chave] = req.body[chave];
        }
    });
    res.send(pessoa)
});

app.delete('/api/pessoas/:nome', (req, res) => {
    const pessoa = pessoas.find((p) => p.nome == req.params.nome);
    if (!pessoa) return res.status(404).send(`A pessoa chamada ${req.params.nome} não foi encontrada`);

    const indice = pessoas.indexOf(pessoa);
    pessoas.splice(indice, 1);

    res.send(pessoa);

});


// inicia servidor
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`Escutando atentamente na porta ${port}...`);
});

// validação
function validaPessoa(pessoa) {
    const esquema = Joi.object({
        nome: Joi.string().min(3).required(),
        comunidades: Joi.array().items(Joi.string()).default([]),
        html: Joi.string().default("<h1>Seu nome</h1><p>descrição</p>")
    });
    return esquema.validate(pessoa);
}