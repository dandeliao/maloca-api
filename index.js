const express = require('express');
const path = require('path');
const Joi = require('joi');
const cors = require('cors');
const fs = require('fs');
const {readFile} = require('fs');
const {writeFile} = require('fs');
const formidable = require('formidable');
const mv = require('mv');

const app = express();

// middleware
// ---
app.use(cors());
app.options('*', cors());
app.use('/api', express.static(path.join(__dirname, 'static')));
app.use(express.json());
/* app.use(express.urlencoded({
    extended: true
})); */


// dados
// ---
var pessoas = [
    {
        id: 0,
        tipo: "pessoa",
        nome: "dani",
        comunidades: ["radio-maloca", "filmes"],
        descricao: "a palavra pessoa hoje não soa bem",
        conjuntoDeLinguagem: {artigo: ["-", "e", "o"], pronome: ["elu", "ele"], flexao: ["-e", "-o"]},
        avatar: "/api/pessoas/dani/avatar.png",
        fundo: "/api/pessoas/dani/fundo.png"
    },
    {
        id: 1,
        tipo: "pessoa",
        nome: "rukib",
        comunidades: [],
        descricao: "Perfil modelo. Gosta de fotografia, de livros, de música e de ser clonado para outros perfis.",
        conjuntoDeLinguagem: {artigo: ["e", "o", "a"], pronome: ["elu", "ele", "ela"], flexao: ["-e", "-o", "-a"]},
        avatar: "/api/pessoas/rukib/avatar.png",
        fundo: "/api/pessoas/rukib/fundo.gif"
    }
];
var comunidades = [
    {
        id: 0,
        tipo: "comunidade",
        nome: "radio-maloca",
        descricao: "comunidade para ouvir e compartilhar música",
        conjuntoDeLinguagem: {artigo: ["a"], pronome: ["ela"], flexao: ["-a"]},
        avatar: "/api/comunidades/radio-maloca/avatar.png",
        fundo: "/api/comunidades/radio-maloca/fundo.jpg"
    }
];

var instancias = [
    {
        id: 0,
        tipo: "instancia",
        nome: "maloca",
        descricao: "cabana comunitária",
        conjuntoDeLinguagem: {artigo: ["a"], pronome: ["ela"], flexao: ["-a"]},
        avatar: "/api/instancias/maloca/avatar.png",
        fundo: "/api/instancias/maloca/fundo.jpg"
    }
];

var pecinhas = [
    {
        id: 0,
        nome: "m-card",
        js: './pecinhas/m-card.js'
    }
];

// routing
// ---

app.get('/', (req, res) => res.send('está vivo!'));

// routing => pessoas

app.get('/api/pessoas', (req, res) => {
    res.send(pessoas);
});

app.get('/api/pessoas/:nome', (req, res) => {
    const pessoa = pessoas.find((p) => p.nome == req.params.nome);
    if (!pessoa) return res.status(404).send(`A pessoa chamada ${req.params.nome} não foi encontrada`);
    readFile(`static/pessoas/${req.params.nome}/paginas/0.html`, "utf8", (error, texto) => {
        if (error) throw error;
        pessoa.html = texto;
        res.send(pessoa);
    });
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

    writeFile(`static/pessoas/${req.params.nome}/paginas/0.html`, req.body.html, err => {
        if (err) console.log(`Failed to write file: ${err}`);
        else console.log("File written.");
        pessoa.html = req.body.html;
        res.send(pessoa);
    });
});

app.delete('/api/pessoas/:nome', (req, res) => {
    const pessoa = pessoas.find((p) => p.nome == req.params.nome);
    if (!pessoa) return res.status(404).send(`A pessoa chamada ${req.params.nome} não foi encontrada`);

    const indice = pessoas.indexOf(pessoa);
    pessoas.splice(indice, 1);

    res.send(pessoa);

});

// routing => comunidades

app.get('/api/comunidades', (req, res) => {
    res.send(comunidades);
});

app.get('/api/comunidades/:nome', (req, res) => {
    const comunidade = comunidades.find((c) => c.nome == req.params.nome);
    if (!comunidade) return res.status(404).send(`A comunidade chamada ${req.params.nome} não foi encontrada`);
    readFile(`static/comunidades/${req.params.nome}/paginas/0.html`, "utf8", (error, texto) => {
        if (error) throw error;
        comunidade.html = texto;
        res.send(comunidade);
    });
});

app.put('/api/comunidades/:nome', (req, res) => {
    const comunidade = comunidades.find((c) => c.nome == req.params.nome);
    if (!comunidade) return res.status(404).send(`A comunidade chamada ${req.params.nome} não foi encontrada`);

    const { error } = validaComunidade(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.keys(comunidade).forEach((chave) => {
        if (req.body[chave]) {
            comunidade[chave] = req.body[chave];
        }
    });

    writeFile(`static/comunidades/${req.params.nome}/paginas/0.html`, req.body.html, err => {
        if (err) console.log(`Failed to write file: ${err}`);
        else console.log("File written.");
        comunidade.html = req.body.html;
        res.send(comunidade);
    });
});

// routing => instancias

app.get('/api/instancias', (req, res) => {
    res.send(instancias);
});

app.get('/api/instancias/:nome', (req, res) => {
    const instancia = instancias.find((i) => i.nome == req.params.nome);
    if (!instancia) return res.status(404).send(`A instância chamada ${req.params.nome} não foi encontrada`);
    if (req.params.nome === "maloca") {
        readFile(`static/instancias/${req.params.nome}/paginas/0.html`, "utf8", (error, texto) => {
            if (error) throw error;
            instancia.html = texto;
            res.send(instancia);
        });
    } else {
        console.log("chamada a instância externa");
    }
});

app.get('/api/instancias/:nome/painel', (req, res) => {
    const instancia = instancias.find((i) => i.nome == req.params.nome);
    if (!instancia) return res.status(404).send(`A instância chamada ${req.params.nome} não foi encontrada`);
    if (req.params.nome === "maloca") {
        readFile(`static/instancias/${req.params.nome}/paginas/painel.html`, "utf8", (error, texto) => {
            if (error) throw error;
            let painel = {"html": texto};
            res.send(painel);
        });
    } else {
        console.log("chamada a instância externa");
    }
});

app.put('/api/instancias/:nome', (req, res) => {
    const instancia = instancias.find((i) => i.nome == req.params.nome);
    if (!instancia) return res.status(404).send(`A instância chamada ${req.params.nome} não foi encontrada`);

    const { error } = validaInstancia(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.params.nome === "maloca") {
        Object.keys(instancia).forEach((chave) => {
            if (req.body[chave]) {
                instancia[chave] = req.body[chave];
            }
        });

        writeFile(`static/instancias/maloca/paginas/0.html`, req.body.html, err => {
            if (err) console.log(`Failed to write file: ${err}`);
            else console.log("File written.");
            instancia.html = req.body.html;
            res.send(instancia);
        });
    } else {
        console.log("solicitou instância externa");
    }
});


// routing => pecinhas

app.get('/api/pecinhas', (req, res) => {
    res.send(pecinhas);
});

app.get('/api/pecinhas/:nome', (req, res) => {
    const pecinha = pecinhas.find((p) => p.nome == req.params.nome);
    if (!pecinha) return res.status(404).send(`A pecinha chamada ${req.params.nome} não foi encontrada`);
    res.send(); // rever Eloquent JavaScript (cap. 21) para servir arquivos estáticos
});


// routing => upload de dados e arquivos
app.post('/api/bota', (req, res) => {
    // b.o.t.a. é um acrônimo para "Bota Online Tais Arquivos"
    try {

        new formidable.IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error', err)
                throw err
            }
            console.log('Fields', fields)

            // define quem é o sujeito (qual pessoa, comunidade ou instância)
            let sujeito = new Object();
            if (fields.tipo == "pessoa") {
                sujeito = pessoas.find(p => p.nome === fields.nome);
            } else if (fields.tipo == "comunidade") {
                sujeito = comunidades.find(c => c.nome === fields.nome);
            } else if (fields.tipo == "instancia") {
                sujeito = instancias.find(i => i.nome === fields.nome);
            } else {
                console.log("tipo de recurso desconhecido (não é pessoa, comunidade ou instância)")
            }

            // atualiza banco de dados
            sujeito.descricao = fields.descricao;
            sujeito.conjuntoDeLinguagem = JSON.parse(fields.conjuntoDeLinguagem);
            console.log("informações atualizadas");

            // atualiza html
            writeFile(`static/${fields.tipo}s/${fields.nome}/paginas/0.html`, fields.html, err => {
                if (err) console.log(`falha ao escrever arquivo html: ${err}`);
                else console.log("html atualizado");
            });

            sujeito.html = fields.html;

            // atualiza demais arquivos
            if (files.avatar) {
                fs.unlinkSync(__dirname + "/static" + sujeito.avatar.slice(4));
                sujeito.avatar = `/api/${sujeito.tipo}s/${sujeito.nome}/${files.avatar.originalFilename}`;
                let novoCaminho = `${__dirname}/static/${sujeito.tipo}s/${sujeito.nome}/${files.avatar.originalFilename}`;
                mv(files.avatar.filepath, novoCaminho, function (err) {
                    if (err) throw err
                    console.log('Avatar atualizado')
                });
            }
            if (files.fundo) {
                fs.unlinkSync(__dirname + "/static" + sujeito.fundo.slice(4));
                sujeito.fundo = `/api/${sujeito.tipo}s/${sujeito.nome}/${files.fundo.originalFilename}`;
                let novoCaminho = `${__dirname}/static/${sujeito.tipo}s/${sujeito.nome}/${files.fundo.originalFilename}`;
                mv(files.fundo.filepath, novoCaminho, function (err) {
                    if (err) throw err
                    console.log('Fundo atualizado')
                });
            }

            res.status(200).send(sujeito);

        });

    } catch (err) {
        res.status(500).send("uai!!! " + err);
    }
});


// inicia servidor
// ---
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`Escutando atentamente na porta ${port}...`);
});

// funções auxiliares
// ---

// validação
function validaPessoa(pessoa) {
    const esquema = Joi.object({

        /*
        id: deveria ser gerado pelo banco de dados
        nome: único na instancia
        instancia: endereço da instancia + papeis
        comunidades: uma lista de comunidades + papéis
        páginas: html principal + uma lista de htmls (pensar na questão das abas vs. exibição fora da maloca)
        itens: lista de itens recebidos

        [obs: os arquivos estáticos devem ter caminhos /img (avatar, fundo, outras)
         e /html, no mínimo, e não serão necessariamente públicos. Importante: pensar se
         não é melhor criar pastas estáticas para cada componente que armazene dados: galeria,
         gaveta de links, etc
        ]
        */

        id: Joi.number(),
        tipo: Joi.string(),
        nome: Joi.string().min(3).required(),
        comunidades: Joi.array().items(Joi.string()).default([]),
        descricao: Joi.string().default("eu sou uma pessoa"),
        conjuntoDeLinguagem: Joi.object().default({artigo: ["e"], pronome: ["elu"], flexao: ["e"]}),
        avatar: Joi.string(),
        fundo: Joi.string().default("linear-gradient(lightpink, #a7f3d0)"),
        html: Joi.string()
    });
    return esquema.validate(pessoa);
}

function validaComunidade(comunidade) {

    /*
        id: deveria ser gerado pelo banco de dados
        nome: único na instancia
        instancia: endereço da instancia + papeis
        usuaries: uma lista de usuaries + papéis
        páginas: html principal + uma lista de htmls (pensar na questão das abas vs. exibição fora da maloca)
        itens: lista de itens que é capaz de produzir (com nome + descrição)

        [obs: os arquivos estáticos devem ter caminhos /img (avatar, fundo, itens, outras) 
         e /html, no mínimo, e não serão necessariamente públicos. Importante: pensar se
         não é melhor criar pastas estáticas para cada componente que armazene dados: chat,
         fórum, galerias, etc, ou até mesmo usar um headless cms para manejar posts em certas
         páginas/componentes.
        ]
        */

    const esquema = Joi.object({
        id: Joi.number(),
        tipo: Joi.string(),
        nome: Joi.string().min(3).required(),
        descricao: Joi.string().default("comunidade virtual"),
        conjuntoDeLinguagem: Joi.object().default({artigo: ["e"], pronome: ["elu"], flexao: ["e"]}),
        avatar: Joi.string(),
        fundo: Joi.string().default("linear-gradient(lightpink, #a7f3d0)"),
        html: Joi.string()
    });
    return esquema.validate(comunidade);
}

function validaInstancia(instancia) {
    const esquema = Joi.object({
        id: Joi.number().required(),
        tipo: Joi.string(),
        nome: Joi.string().min(3).required(),
        descricao: Joi.string().default("cabana comunitária"),
        conjuntoDeLinguagem: Joi.object().default({artigo: ["e"], pronome: ["elu"], flexao: ["e"]}),
        avatar: Joi.string(),
        fundo: Joi.string().default("linear-gradient(lightpink, #a7f3d0)"),
        html: Joi.string()
    });
    return esquema.validate(instancia);
}