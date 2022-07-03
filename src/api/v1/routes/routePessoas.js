const express = require('express');
const router = express.Router();
const servicePessoas = require('../services/servicePessoas');
const taAutenticade = require('../middlewares/authentication');

router.use(taAutenticade);

router.get('/', async (req, res, next) => {
	try {
		const pessoas = await servicePessoas.getPessoas();
		res.json(pessoas);
	} catch (erro) {
		next(erro);
	}
	
});

router.get('/:arroba', async (req, res, next) => {
	try {
		const pessoa = await servicePessoas.getPessoa(req.params.arroba);
		res.json(pessoa);
	} catch (erro) {
		next(erro);
	}
	
});

router.put('/:arroba', async (req, res, next) => {
	try {
		const pessoa = req.body;
		await servicePessoas.putPessoa(req.params.arroba, pessoa);
		res.status(204).end();
	} catch (erro) {
		next(erro);
	}
	
});

router.delete('/:arroba', async (req, res, next) => {
	try {
		const pessoaId = req.params.arroba;
		await servicePessoas.deletePessoa(pessoaId);
		res.status(204).end();
	} catch (erro) {
		next(erro);
	}
	
});

module.exports = router;