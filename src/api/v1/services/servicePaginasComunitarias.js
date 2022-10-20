const dataPaginasComunitarias = require('../data/dataPaginasComunitarias');
const dataPessoasComunidades = require('../data/dataPessoasComunidades');
const path = require('path');
const fs = require('fs');

exports.getPaginasComunitarias = async function (comunidadeId) {
	const objetoPaginas = await dataPaginasComunitarias.getPaginasComunitarias(comunidadeId);
	const sortedPaginas = await objetoPaginas.rows.sort((a, b) => {
		return a.pagina_comunitaria_id - b.pagina_comunitaria_id;
	});
	console.log('sortedPaginas:', sortedPaginas);
	return sortedPaginas;
};

exports.getPaginaComunitaria = async function (comunidadeId, paginaId) {
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${comunidadeId}`, 'paginas', `${paginaId}.html`);
	return caminho;

};

exports.createPaginaComunitaria = async function (dados, pessoaId) {
	const dadosPessoaComunidade = await dataPessoasComunidades.getPessoaComunidade(pessoaId, dados.comunidade_id);
	if (dadosPessoaComunidade.rows[0].editar) {
		const dataResponse = await dataPaginasComunitarias.createPaginaComunitaria(dados);
		const paginaId = dataResponse.rows[0].pagina_comunitaria_id;
		const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`, 'paginas', `${paginaId}.html`);
		fs.writeFile(caminho, dados.html, erro => {
			if (erro) {
				throw erro;
			}
		});
		return dataResponse.rows[0];
	} else {
		throw new Error ('pessoa não tem habilidade para acessar este recurso');
	}
};

exports.editPaginaComunitaria = async function (dados, pessoaId) {
	const dadosPessoaComunidade = await dataPessoasComunidades.getPessoaComunidade(pessoaId, dados.comunidade_id);
	if (dadosPessoaComunidade.rows[0].editar) {
		const dataResponse = await dataPaginasComunitarias.editPaginaComunitaria(dados);
		const paginaId = dataResponse.rows[0].pagina_comunitaria_id;
		const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`, 'paginas', `${paginaId}.html`);
		console.log('caminho:', caminho);
		fs.writeFile(caminho, dados.html, erro => {
			if (erro) {
				throw erro;
			}
		});
		return dataResponse.rows[0];
	} else {
		throw new Error ('pessoa não tem habilidade para acessar este recurso');
	}
};

exports.deletePaginaComunitaria = async function (dados, pessoaId) {
	const dadosPessoaComunidade = await dataPessoasComunidades.getPessoaComunidade(pessoaId, dados.comunidade_id);
	if (dadosPessoaComunidade.rows[0].editar) {
		const dataResponse = await dataPaginasComunitarias.deletePaginaComunitaria(dados);
		const paginaId = dataResponse.rows[0].pagina_comunitaria_id;
		const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`, 'paginas', `${paginaId}.html`);
		fs.unlink(caminho, (err) => {
			if (err) {
				if (err.code !== 'ENOENT') { // se o erro for arquivo não encontrado, não faz nada
					throw err;
				}
			}
		});
	} else {
		throw new Error ('pessoa não tem habilidade para acessar este recurso');
	}
};