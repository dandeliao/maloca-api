const express = require('express');
const path = require('path');
const Joi = require('joi');
const cors = require('cors');

const app = express();

// middleware
// ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.options('*', cors());


// dados
// ---
const pessoas = [
    {
        id: 0,
        nome: "dani",
        comunidades: ["radio-maloca", "filmes"],
        html: `
        <m-container style="
            --background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/88/Tile_n_728.png');
            --container-background: rgba(256, 256, 256, 0.3);
            ">
            <m-card>
                <div class="info-perfil">
                    <img src="http://localhost:4000/pessoas/dani/avatar.png">
                    <div>
                        <h1>Oi! Sou Dani :)</h1>
                        <br>
                        <ul>
                            <li>desde 1990</li>
                            <li>70% algodão</li>
                            <li>feito pra durar</li>
                            <li>às vezes dá tilt</li>
                        </ul>
                    </div>
                </div>
                <marquee>bem-vinde à minha página pessoal</marquee>
            </m-card>
            <m-card>
                <h3>Aqui posso colocar comunidades que gosto, links, fotos...</h3>
                <p>(...)</p>
            </m-card>
            <m-card>
                <p>posso inserir quantos cards quiser :B</p>
                <br>
                <button title="javascript não pode :X só executa o que já vem embutido em elementos como o card">injetar script</button>
            </m-card>
        </m-container>
        <style>
            .info-perfil {
                display: flex;
                flex-direction: row;
                justify-content: start;
            }
            .info-perfil > img {
                max-width: 200px;
                width: 100%;
                height: auto;
                border-radius: 100%;
                margin-right: 2rem;
            }
            ul {
                margin-left: 2rem;
            }
        </style>
        `
    },
    {
        id: 1,
        nome: "rukib",
        comunidades: [],
        html: `
        <m-container style="
            --background-image: url('https://upload.wikimedia.org/wikipedia/commons/c/c0/Gray_background.gif');
            --container-background: transparent;
            ">
            <m-card>
                <div class="info-perfil">
                    <img src="http://localhost:4000/pessoas/rukib/avatar.png">
                    <div>
                        <h1>rukib</h1>
                        <marquee>i am am i who am i</marquee>
                    </div>
                </div>
            </m-card>
            <m-card>
                <h3>Aqui posso colocar comunidades que gosto, links, fotos...</h3>
                <p>(...)</p>
            </m-card>
            <div id="cardao">
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flower_market_cross_stitch%2C_v1.jpg/613px-Flower_market_cross_stitch%2C_v1.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Reiher_im_Starkwind.jpg/639px-Reiher_im_Starkwind.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sancerre%2C_Rue_Saint-Jean.jpg/583px-Sancerre%2C_Rue_Saint-Jean.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Ceramicagrottagliese.jpg/640px-Ceramicagrottagliese.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Bienenweide.jpg/568px-Bienenweide.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Northsea-eckwarderh%C3%B6rne_hg.jpg/640px-Northsea-eckwarderh%C3%B6rne_hg.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kumpulanpuro_culvert.jpg/511px-Kumpulanpuro_culvert.jpg">
                </m-card>
                <m-card class="cardim">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Mt._Ararat_via_Khor_Virap%2C_Armenia.jpg/640px-Mt._Ararat_via_Khor_Virap%2C_Armenia.jpg">
                </m-card>
            </div>
        </m-container>
        <style>
            .info-perfil {
                display: flex;
                flex-direction: row;
                justify-content: start;
            }
            .info-perfil > img {
                max-width: 200px;
                width: 100%;
                height: auto;
                border-radius: 100%;
                margin-right: 2rem;
            }
            #cardao {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                gap: 1em;
            }
            .cardim {
                flex-grow: 0;
            }
            .cardim img {
                max-width: 250px;
                height: auto;
            }
        </style>
        `
    }
];
const comunidades = [
    {
        id: 0,
        nome: "radio-maloca",
        html: `
        <m-container style="
                --background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/5e/Tile_n_745.png');
                --container-background: rgba(170, 170, 170, 0.8);
            ">
            <m-card>
                <div class="info">
                    <img src='http://localhost:4000/comunidades/radio-maloca/avatar.png' />
                    <div>
                        <h1>Rádio Maloca</h1>
                        <p>comunidade para ouvir e compartilhar música</p>
                        <br>
                        <p>24h no ar</p>
                    </div>
                </div>
            </m-card>
            <m-card>
                <h3>Rap</h3>
                <p>(...)</p>
            </m-card>
            <m-card>
                <h3>Sol e praia</h3>
                <p>(...)</p>
            </m-card>
            <m-card>
                <h3>Para estudar/relaxar</h3>
                <p>(...)</p>
            </m-card>
            <m-card>
                <h3>Agito</h3>
                <p>(...)</p>
            </m-card>
        </m-container>
        <style>
            .info {
                display: flex;
                flex-direction: row;
                justify-content: start;
            }
            .info > img {
                max-width: 200px;
                width: 100%;
                height: auto;
                border-radius: 100%;
                margin-right: 2rem;
            }
            ul {
                margin-left: 2rem;
            }
        </style>

        `
    }
];

const instancias = [
    {
        id: 0,
        nome: "maloca",
        html: `
        <m-container style="
            --background-image: linear-gradient(lightpink, #a7f3d0);
            --container-background: rgba(256, 256, 256, 0.3);
            ">
            <m-card style="
                --box-shadow: none;
                --background: transparent;
                ">
                <div class="info">
                    <div>
                        <h1>Oi, maloqueire!</h1>
                        <p>seja bem-vinde à nossa cabana comunitária</p>
                    </div>
                </div>
            </m-card>
            <m-card style="
                --background: khaki;
                --border-radius: 0;
                --border-style: dotted;
                --box-shadow: none;
                ">
                <h3>Mural de avisos</h3>
                <p>---</p>
            </m-card>
            <div id="cardao">
                <m-card class="cardim">
                    <h3>Comunidades</h3>
                    <p>(...)</p>
                </m-card>
                <m-card class="cardim">
                    <h3>Chat</h3>
                    <p>(...)</p>
                </m-card>
            </div>
        </m-container>
        <style>
            .info {
                display: flex;
                flex-direction: row;
                justify-content: start;
            }
            .info > img {
                max-width: 200px;
                width: 100%;
                height: auto;
                border-radius: 100%;
                margin-right: 2rem;
            }
            #cardao {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                gap: 1em;
            }
            .cardim {
                flex-grow: 1;
            }
        </style>
        `
    }
];

const pecinhas = [
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

// routing => comunidades

app.get('/api/comunidades', (req, res) => {
    res.send(comunidades);
});

app.get('/api/comunidades/:nome', (req, res) => {
    const comunidade = comunidades.find((c) => c.nome == req.params.nome);
    if (!comunidade) return res.status(404).send(`A comunidade chamada ${req.params.nome} não foi encontrada`);
    res.send(comunidade);
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
    res.send(comunidade);
});

// routing => instancias

app.get('/api/instancias', (req, res) => {
    res.send(instancias);
});

app.get('/api/instancias/:nome', (req, res) => {
    const instancia = instancias.find((i) => i.nome == req.params.nome);
    if (!instancia) return res.status(404).send(`A instância chamada ${req.params.nome} não foi encontrada`);
    res.send(instancia);
});

app.put('/api/instancias/:nome', (req, res) => {
    const instancia = instancias.find((i) => i.nome == req.params.nome);
    if (!instancia) return res.status(404).send(`A instância chamada ${req.params.nome} não foi encontrada`);

    const { error } = validaInstancia(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.keys(instancia).forEach((chave) => {
        if (req.body[chave]) {
            instancia[chave] = req.body[chave];
        }
    });
    res.send(instancia);
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
        id: Joi.number(),
        nome: Joi.string().min(3).required(),
        comunidades: Joi.array().items(Joi.string()).default([]),
        html: Joi.string().default("<h1>Seu nome</h1><p>descrição</p>")
    });
    return esquema.validate(pessoa);
}

function validaComunidade(comunidade) {
    const esquema = Joi.object({
        id: Joi.number(),
        nome: Joi.string().min(3).required(),
        html: Joi.string().default("<h1>Comunidade</h1><p>descrição</p>")
    });
    return esquema.validate(comunidade);
}

function validaInstancia(instancia) {
    const esquema = Joi.object({
        id: Joi.number().required(),
        nome: Joi.string().min(3).required(),
        html: Joi.string().default("<h1>Instância</h1><p>descrição</p>")
    });
    return esquema.validate(instancia);
}