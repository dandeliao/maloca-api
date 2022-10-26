const express = require('express');
const router = express.Router();
const taAutenticade = require('../middlewares/authentication');
const path = require('path');
const servicePessoas = require('../services/servicePessoas');
const servicePaginasPessoais = require('../services/servicePaginasPessoais');
const serviceObjetosPessoais = require('../services/serviceObjetosPessoais');

router.use(taAutenticade);

// ---
// dados gerais das pessoas

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

// ---
// páginas pessoais

router.get('/:arroba/paginas', async (req, res, next) => {
	try {
		const paginas = await servicePaginasPessoais.getPaginasPessoais(req.params.arroba);
		res.json(paginas);
	} catch (erro) {
		next(erro);
	}
	
});

router.get('/:arroba/:pagina', async (req, res, next) => {
	try {
		// falta middleware (ou usar o service) para verificar autorização (páginas públicas podem ser vistas por todes, páginas privadas só por quem criou)
		const caminhoDoArquivo = await servicePaginasPessoais.getPaginaPessoal(req.params.arroba, req.params.pagina);
		res.sendFile(caminhoDoArquivo);
	} catch (erro) {
		next(erro);
	}
});

router.post('/:arroba/paginas', async (req, res, next) => {
	try {
		const dados = {
			pessoa_id: req.params.arroba,
			titulo: req.body.titulo,
			publica: req.body.publica,
			html: req.body.html
		};

		// falta verificar autorização (com base na pessoa autenticada), validar dados e sanitizar o html

		const dadosCriados = await servicePaginasPessoais.createPaginaPessoal(dados);
		res.status(201).json(dadosCriados);

	} catch (erro) {
		next (erro);
	}
});

router.put('/:arroba/:pagina', async (req, res, next) => {
	try {
		const dados = {
			pessoa_id: req.params.arroba,
			pagina_pessoal_id: req.params.pagina,
			titulo: req.body.titulo,
			publica: req.body.publica,
			html: req.body.html
		};

		// falta verificar autorização (com base na pessoa autenticada), validar dados e sanitizar o html

		const dadosModificados = await servicePaginasPessoais.editPaginaPessoal(dados);
		res.status(200).json(dadosModificados);

	} catch (erro) {
		next (erro);
	}
});

router.delete('/:arroba/:pagina', async (req, res, next) => {
	try {
		const dados = {
			pessoa_id: req.params.arroba,
			pagina_pessoal_id: req.params.pagina
		};

		// falta verificar autorização (com base na pessoa autenticada) e validar dados

		await servicePaginasPessoais.deletePaginaPessoal(dados);
		res.status(204).end();

	} catch (erro) {
		next(erro);
	}
});

// ---
// objetos pessoais

router.get('/:arroba/objetos/avatar', async (req, res, next) => {
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

router.get('/:arroba/objetos/fundo', async (req, res, next) => {
	try {
		const dadosDaPessoa = await servicePessoas.getPessoa(req.params.arroba);
		const nomeDoArquivo = dadosDaPessoa.fundo;
		console.log('nomeDoArquivo:', nomeDoArquivo);
		const caminhoDoArquivo = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', req.params.arroba, 'imagens', nomeDoArquivo);
		res.sendFile(caminhoDoArquivo);
	} catch (erro) {
		next(erro);
	}
});

router.get('/:arroba/objetos/comunidades', async (req, res, next) => {
	try {
		const comunidades = await serviceObjetosPessoais.getComunidadesPessoais(req.params.arroba);
		res.json(comunidades); 
	} catch (erro) {
		next(erro);
	}
});

router.get('/:arroba/objetos/comunidade', async (req, res, next) => { // comunidade?id="valor"
	try {
		console.log('entrou na rota pessoacomunidade');
		console.log('COMUNIDADE ID:', req.params.comunidadeId);
		const pessoaComunidade = await serviceObjetosPessoais.getComunidadePessoal(req.params.arroba, req.query.id);
		res.json(pessoaComunidade);
	} catch (erro) {
		next(erro);
	}
});

router.put('/:arroba/objetos/comunidades/:comunidadeId'), async (req, res, next) => {
	try {
		const habilidades = req.body;
		const serviceResult = await serviceObjetosPessoais.editComunidadePessoal(req.params.arroba, req.params.comunidadeId, habilidades);
		res.json(serviceResult);
	} catch (erro) {
		next(erro);
	}
};

module.exports = router;