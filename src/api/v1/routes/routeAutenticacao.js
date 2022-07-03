const express = require('express');
const router = express.Router();
const serviceAutenticacao = require('../services/serviceAutenticacao');

router.post('/registro', async (req, res, next) => {
	try {
		// falta fazer validação dos dados antes
		// (qual a camada responsável por chamar a validação?)
		
		const pessoa = {
			pessoa_id: req.body.pessoa_id,
			nome: req.body.nome,
			email: req.body.email,
			senha: req.body.senha
		};
		const novaPessoa = await serviceAutenticacao.postRegistro(pessoa);
		res.status(201).json(novaPessoa);
	} catch (erro) {
		next(erro);
	}
});

module.exports = router;