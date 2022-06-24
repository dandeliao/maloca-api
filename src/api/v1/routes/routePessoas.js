const express = require('express');
const router = express.Router();
const servicePessoas = require('../services/servicePessoas');

router.get('/pessoas', async (req, res) => {
	const pessoas = await servicePessoas.getPessoas();
	res.json(pessoas);
});

router.get('/pessoas/:arroba', async (req, res) => {
	try {
		const pessoa = await servicePessoas.getPessoa(req.params.arroba);
		res.json(pessoa);
	} catch (erro) {
		res.status(404).send(erro.message);
	}
	
});

router.post('/pessoas', async (req, res) => {
	try {
		const pessoa = req.body;
		const novaPessoa = await servicePessoas.postPessoa(pessoa);
		res.status(201).json(novaPessoa);
	} catch (erro) {
		res.status(409).send(erro.message);
	}
});

router.put('/pessoas/:arroba', async (req, res) => {
	try {
		const pessoa = req.body;
		await servicePessoas.putPessoa(req.params.arroba, pessoa);
		res.status(204).end();
	} catch (erro) {
		res.status(404).send(erro.message);
	}
	
});

router.delete('/pessoas/:arroba', async (req, res) => {
	try {
		const pessoaId = req.params.arroba;
		await servicePessoas.deletePessoa(pessoaId);
		res.status(204).end();
	} catch (erro) {
		res.status(404).send(erro.message);
	}
	
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