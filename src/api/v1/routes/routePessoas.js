const express = require('express');
const router = express.Router();
const servicePessoas = require('../services/servicePessoas');

router.get('/pessoas', async (req, res) => {
    const pessoas = await servicePessoas.getPessoas();
    res.json(pessoas.rows);
});

router.get('/pessoas/:arroba', async (req, res) => {

});

router.post('/pessoas', async (req, res) => {

});

router.put('/pessoas', async (req, res) => {
    
});

router.delete('/pessoas/:arroba', async (req, res) => {

});

/*
get pessoas/
    retorna em json todas as informações da tabela "pessoas"

get pessoas/:arroba || get pessoas/:id
    retorna em json as informações da pessoa


post pessoas/
    insere nova pessoa com base em dados de formulário e do link de indicação (cookie?)
    insere na tabela de autenticacao as informações de email e senha (hash+salt)
    retorna em json as informações da pessoa inserida


put pessoas/:arroba || put pessoas/:id
    altera informações da pessoa
    faz o upload de avatar e fundo se for o caso
    retorna em json as informações da pessoa modificada


delete pessoas/:arroba || delete pessoas/:id
    apaga pessoa do banco de dados (autenticação e páginas pessoais também)
    apaga arquivos da pessoa e remove sua pasta no armazenamento
    retorna ok

*/

module.exports = router;