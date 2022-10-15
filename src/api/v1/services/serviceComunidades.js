const dataComunidades = require('../data/dataComunidades');
const dataPessoasComunidades = require('../data/dataPessoasComunidades');
const serviceObjetosPessoais = require('./serviceObjetosPessoais');
const fs = require('fs');
const path = require('path');

exports.getComunidades = async function () {
	const objetoComunidades = await dataComunidades.getComunidades();
	return objetoComunidades.rows;
};

exports.getComunidade = async function (comunidadeId) {
	const objetoComunidade = await dataComunidades.getComunidade(comunidadeId);
	if (objetoComunidade.rowCount === 0) throw new Error ('comunidade não encontrada');
	return objetoComunidade.rows[0];
};

exports.postComunidade = async function (dados, pessoaId) {
	
	// verifica habilidade de participar no servidor
	const superHabilidades = await serviceObjetosPessoais.getComunidadePessoal(pessoaId, 'maloca');
	if (superHabilidades.participar) {

		// verifica se comunidade com esse id já existe
		const comunidadeExistente = await dataComunidades.getComunidade(dados.comunidade_id);
		if (comunidadeExistente.rowCount !== 0) throw new Error('comunidade já existe');
		
		// cria comunidade
		const comunidade = {
			comunidade_id: dados.comunidade_id,
			nome: dados.nome
		};
		const arrayNovaComunidade = await dataComunidades.postComunidade(comunidade);
		
		// pessoa que criou a comunidade começa com todos os papeis
		const habilidades = {
			ver: true,
			participar: true,
			editar: true,
			moderar: true,
			cuidar: true
		};
		await dataPessoasComunidades.postPessoaComunidade(pessoaId, arrayNovaComunidade.rows[0].comunidade_id, habilidades);
		
		// cria pastas comunitárias
		const pastaComunitaria = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`);
		if (!fs.existsSync(pastaComunitaria)){
			fs.mkdirSync(pastaComunitaria);
		}
		if (!fs.existsSync(path.join(pastaComunitaria, 'imagens'))){
			fs.mkdirSync(path.join(pastaComunitaria, 'imagens'));
		}
		if (!fs.existsSync(path.join(pastaComunitaria, 'paginas'))){
			fs.mkdirSync(path.join(pastaComunitaria, 'paginas'));
		}
		
		// copia avatar padrão para pasta comunitária / imagens
		const pastaDefault = path.join(path.resolve(__dirname, '../../../../static'), 'default');
		fs.copyFileSync(path.join(pastaDefault, 'avatar_comum.jpg'), path.join(pastaComunitaria, 'imagens', 'avatar_comum.jpg'));

		return arrayNovaComunidade.rows[0];
	} else {
		throw new Error ('pessoa não tem habilidade para acessar esse recurso');
	}

	
};

exports.putComunidade = async function (dados, pessoaId) {
	const dadosPessoaComunidade = await dataPessoasComunidades.getPessoaComunidade(pessoaId, dados.comunidade_id);
	if (dadosPessoaComunidade.cuidar) {
		const objetoComunidade = await dataComunidades.putComunidade(dados);
		if (objetoComunidade.rowCount === 0) throw new Error('comunidade não encontrada');
		return objetoComunidade.rows[0];
	} else {
		throw new Error ('pessoa não tem habilidade para acessar este recurso');
	}
	
};

exports.deleteComunidade = async function (comunidadeId, pessoaId) {
	
	// falta deletar páginas comunitárias
	
	const dadosPessoaComunidade = await dataPessoasComunidades.getPessoaComunidade(pessoaId, comunidadeId);
	if (dadosPessoaComunidade.cuidar) {

		// deleta todas as entradas de pessoas para a comunidade na tabela "pessoas_comunidades"
		const pessoas = await dataPessoasComunidades.getPessoasComunidade(comunidadeId);
		for (let i = 0; i < pessoas.length; i++) {
			await dataPessoasComunidades.deletePessoaComunidade(pessoas[i].pessoa_id);
		}
		
		// deleta comunidade
		const vereditoComunidade = await dataComunidades.deleteComunidade(comunidadeId);
		if (vereditoComunidade.rowCount === 0) throw new Error('comunidade não encontrada');
		
		return vereditoComunidade;
	
	} else {
		throw new Error ('pessoa não tem habilidade para acessar este recurso');
	}

	
};