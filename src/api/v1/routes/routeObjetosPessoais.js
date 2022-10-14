const express = require('express');
const router = express.Router();
const servicePessoas = require('../services/servicePessoas');
const taAutenticade = require('../middlewares/authentication');
const path = require('path');

router.use(taAutenticade);

router.get('/:arroba/avatar', async (req, res, next) => {
	try {
		const dadosDaPessoa = await servicePessoas.getPessoa(req.params.arroba);
		const nomeDoArquivo = dadosDaPessoa.avatar;
		console.log('nomeDoArquivo:', nomeDoArquivo);
		const caminhoDoArquivo = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', req.params.arroba, 'imagens', nomeDoArquivo);
		res.sendFile(caminhoDoArquivo);
	} catch (erro) {
		next(erro);
	}
});

module.exports = router;