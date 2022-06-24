const controllerPessoas = require('../controllers/controllerPessoas');

exports.getPessoas = async function () {
	const objetoPessoas = await controllerPessoas.getPessoas();
	return objetoPessoas.rows;
};

exports.getPessoa = async function (pessoaId) {
	const objetoPessoa = await controllerPessoas.getPessoa(pessoaId);
	if (objetoPessoa.rowCount === 0) throw new Error ('pessoa não encontrada');
	return objetoPessoa.rows[0];
};

exports.postPessoa = async function (pessoa) {
	const pessoaExistente = await controllerPessoas.getPessoa(pessoa.pessoa_id);
	if (pessoaExistente.rowCount !== 0) throw new Error('pessoa já existe');
	const objetoPessoaId = await controllerPessoas.postPessoa(pessoa);
	return objetoPessoaId.rows[0];
};

exports.putPessoa = async function (pessoaId, pessoa) {
	const objetoPessoa = await controllerPessoas.putPessoa(pessoaId, pessoa);
	if (objetoPessoa.rowCount === 0) throw new Error('pessoa não encontrada');
	return objetoPessoa.rows[0];
};

exports.deletePessoa = async function (pessoaId) {
	const veredito = await controllerPessoas.deletePessoa(pessoaId);
	if (veredito.rowCount === 0) throw new Error('pessoa não encontrada');
	return veredito.rowCount;
};