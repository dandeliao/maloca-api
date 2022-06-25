const dataPessoas = require('../data/dataPessoas');

exports.getPessoas = async function () {
	const objetoPessoas = await dataPessoas.getPessoas();
	return objetoPessoas.rows;
};

exports.getPessoa = async function (pessoaId) {
	const objetoPessoa = await dataPessoas.getPessoa(pessoaId);
	if (objetoPessoa.rowCount === 0) throw new Error ('pessoa não encontrada');
	return objetoPessoa.rows[0];
};

exports.postPessoa = async function (pessoa) {
	const pessoaExistente = await dataPessoas.getPessoa(pessoa.pessoa_id);
	if (pessoaExistente.rowCount !== 0) throw new Error('pessoa já existe');
	const objetoPessoaId = await dataPessoas.postPessoa(pessoa);
	return objetoPessoaId.rows[0];
};

exports.putPessoa = async function (pessoaId, pessoa) {
	const objetoPessoa = await dataPessoas.putPessoa(pessoaId, pessoa);
	if (objetoPessoa.rowCount === 0) throw new Error('pessoa não encontrada');
	return objetoPessoa.rows[0];
};

exports.deletePessoa = async function (pessoaId) {
	const veredito = await dataPessoas.deletePessoa(pessoaId);
	if (veredito.rowCount === 0) throw new Error('pessoa não encontrada');
	return veredito.rowCount;
};