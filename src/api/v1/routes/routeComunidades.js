const express = require('express');
const router = express.Router();
const taAutenticade = require('../middlewares/authentication');
const path = require('path');
const serviceComunidades = require('../services/serviceComunidades');
const servicePaginasComunitarias = require('../services/servicePaginasComunitarias');
const serviceObjetosComunitarios = require('../services/serviceObjetosComunitarios');

router.use(taAutenticade);

// ---
// dados gerais das comunidades

router.get('/', async (req, res, next) => {
	try {
		const comunidades = await serviceComunidades.getComunidades();
		res.json(comunidades);
	} catch (erro) {
		next(erro);
	}
	
});

router.get('/:arroba', async (req, res, next) => {
	try {
		const comunidade = await serviceComunidades.getComunidade(req.params.arroba);
		res.json(comunidade);
	} catch (erro) {
		next(erro);
	}
	
});

router.put('/:arroba', async (req, res, next) => {
	try {
		const dados = req.body;
		const pessoaId = req.user.pessoa_id;
		await serviceComunidades.putComunidade(dados, pessoaId);
		res.status(204).end();
	} catch (erro) {
		next(erro);
	}
	
});

router.post('/', async (req, res, next) => {
	try {
		const dados = req.body;
		const pessoaId = req.user.pessoa_id;
		const comunidade = await serviceComunidades.postComunidade(dados, pessoaId);
		res.status(201).json(comunidade);
	} catch (erro) {
		next(erro);
	}
});

router.delete('/:arroba', async (req, res, next) => {
	try {
		const comunidadeId = req.params.arroba;
		await serviceComunidades.deleteComunidade(comunidadeId, req.user.pessoa_id);
		res.status(204).end();
	} catch (erro) {
		next(erro);
	}
	
});

// ---
// páginas comunitárias

router.get('/:arroba/paginas', async (req, res, next) => {
	try {
		const paginas = await servicePaginasComunitarias.getPaginasComunitarias(req.params.arroba, req.user.pessoa_id);
		res.json(paginas);
	} catch (erro) {
		next(erro);
	}
	
});

router.get('/:arroba/:pagina', async (req, res, next) => {
	try {
		const caminhoDoArquivo = await servicePaginasComunitarias.getPaginaComunitaria(req.params.arroba, req.params.pagina, req.user.pessoa_id);
		res.sendFile(caminhoDoArquivo);
	} catch (erro) {
		next(erro);
	}
});

router.post('/:arroba/paginas', async (req, res, next) => {
	try {
		const dados = {
			comunidade_id: req.params.arroba,
			titulo: req.body.titulo,
			publica: req.body.publica,
			html: req.body.html
		};

		// falta validar dados e sanitizar o html

		const dadosCriados = await servicePaginasComunitarias.createPaginaComunitaria(dados, req.user.pessoa_id);
		res.status(201).json(dadosCriados);

	} catch (erro) {
		next (erro);
	}
});

router.put('/:arroba/:pagina', async (req, res, next) => {
	try {
		const dados = {
			comunidade_id: req.params.arroba,
			pagina_comunitaria_id: req.params.pagina,
			titulo: req.body.titulo,
			publica: req.body.publica,
			html: req.body.html
		};

		// falta validar dados e sanitizar o html

		const dadosModificados = await servicePaginasComunitarias.editPaginaComunitaria(dados, req.user.pessoa_id);
		res.status(200).json(dadosModificados);

	} catch (erro) {
		next (erro);
	}
});

router.delete('/:arroba/:pagina', async (req, res, next) => {
	try {
		const dados = {
			comunidade_id: req.params.arroba,
			pagina_comunitaria_id: req.params.pagina
		};

		await servicePaginasComunitarias.deletePaginaComunitaria(dados, req.user.pessoa_id);
		res.status(204).end();

	} catch (erro) {
		next(erro);
	}
});

// ---
// objetos comunitários

router.get('/:arroba/objetos/avatar', async (req, res, next) => {
	try {
		const dadosDaComunidade = await serviceComunidades.getComunidade(req.params.arroba);
		const nomeDoArquivo = dadosDaComunidade.avatar;
		const caminhoDoArquivo = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', req.params.arroba, 'imagens', nomeDoArquivo);
		res.sendFile(caminhoDoArquivo);
	} catch (erro) {
		next(erro);
	}
});

router.get('/:arroba/objetos/pessoas', async (req, res, next) => {
	try {
		const pessoas = await serviceObjetosComunitarios.getPessoasNaComunidade(req.params.arroba);
		res.json(pessoas); 
	} catch (erro) {
		next(erro);
	}
});

/*
router.get('/:arroba/objetos/comunidades/:comunidadeId'), async (req, res, next) => {
	try {
		const pessoaComunidade = await serviceObjetosPessoais.getComunidadePessoal(req.params.arroba, req.params.comunidadeId);
		res.json(pessoaComunidade);
	} catch (erro) {
		next(erro);
	}
};

router.put('/:arroba/objetos/comunidades/:comunidadeId'), async (req, res, next) => {
	try {
		const habilidades = req.body;
		const serviceResult = await serviceObjetosPessoais.editComunidadePessoal(req.params.arroba, req.params.comunidadeId, habilidades);
		res.json(serviceResult);
	} catch (erro) {
		next(erro);
	}
}; */

module.exports = router;