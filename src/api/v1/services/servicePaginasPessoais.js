const dataPaginasPessoais = require('../data/dataPaginasPessoais');
const path = require('path');
const fs = require('fs');

exports.getPaginasPessoais = async function (pessoaId) {
	const objetoPaginas = await dataPaginasPessoais.getPaginasPessoais(pessoaId);
	const sortedPaginas = await objetoPaginas.rows.sort((a, b) => {
		return a.pagina_pessoal_id - b.pagina_pessoal_id;
	});
	return sortedPaginas;
};

exports.getPaginaPessoal = async function (pessoaId, paginaId) {
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', `${pessoaId}`, 'paginas', `${paginaId}.html`);
	return caminho;
};

exports.createPaginaPessoal = async function (dados) {
	const dataResponse = await dataPaginasPessoais.createPaginaPessoal(dados);
	const paginaId = dataResponse.rows[0].pagina_pessoal_id;
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', `${dados.pessoa_id}`, 'paginas', `${paginaId}.html`);
	fs.writeFile(caminho, dados.html, erro => {
		if (erro) {
			throw erro;
		}
	});
	return dataResponse.rows[0];
};

exports.editPaginaPessoal = async function (dados) {
	const dataResponse = await dataPaginasPessoais.editPaginaPessoal(dados);
	const paginaId = dataResponse.rows[0].pagina_pessoal_id;
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', `${dados.pessoa_id}`, 'paginas', `${paginaId}.html`);
	fs.writeFile(caminho, dados.html, erro => {
		if (erro) {
			throw erro;
		}
	});
	return dataResponse.rows[0];
};

exports.deletePaginaPessoal = async function (dados) {
	const dataResponse = await dataPaginasPessoais.deletePaginaPessoal(dados);
	const paginaId = dataResponse.rows[0].pagina_pessoal_id;
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', `${dados.pessoa_id}`, 'paginas', `${paginaId}.html`);
	fs.unlink(caminho, (err) => {
		if (err) {
			if (err.code !== 'ENOENT') { // se o erro for arquivo não encontrado, não faz nada
				throw err;
			}
		}
	});
};