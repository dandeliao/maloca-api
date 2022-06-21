const basePessoas = require('../controllers/controllerPessoas');

exports.getPessoas = async function () {
	const objetoPessoas = await basePessoas.getPessoas();
	return objetoPessoas.rows;
};

exports.getPessoa = async function (pessoaId) {
	const objetoPessoa = await basePessoas.getPessoa(pessoaId);
	return objetoPessoa.rows[0];
};

exports.postPessoa = async function (pessoa) {
	const objetoPessoaId = await basePessoas.postPessoa(pessoa);
	return objetoPessoaId.rows[0];
};

exports.deletePessoa = function (pessoaId) {
	return basePessoas.deletePessoa(pessoaId);
};